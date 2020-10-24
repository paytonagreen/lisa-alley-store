const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { randomBytes } = require('crypto');
const { promisify } = require('util');
const { transport, makeANiceEmail } = require('../mail');
const { hasPermission } = require('../utils');
const stripe = require('../stripe');
const generatePassword = require('password-generator');
const randomEmail = require('random-email');

const Mutations = {
  async createItem(parent, args, ctx, info) {
    //TODO: CHeck if they are logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in to do that!');
    }
    const item = await ctx.db.mutation.createItem(
      {
        data: {
          user: {
            connect: {
              id: ctx.request.userId,
            },
          },
          ...args,
        },
      },
      info
    );

    return item;
  },
  updateItem(parent, args, ctx, info) {
    //first take a copy of the updates
    const updates = { ...args };
    //remove the ID from the updates
    delete updates.id;
    //run the update method
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async deleteItem(parent, args, cdtx, info) {
    const where = { id: args.id };
    // 1. Find Item
    const item = await ctx.db.query.item({ where }, `{ id, title, user {id}}`);
    // 2. Check permissions
    const ownsItem = item.user.id === ctx.request.userId;
    const hasPermissions = ctx.request.user.permissions.some((permission) =>
      ['ADMIN', 'ITEMDELETE'].includes(permission)
    );

    if (!ownsItem && hasPermissions) {
      throw new Error(`You don't have permission to do that!`);
    }
    // TODO
    // 3. Delete it!
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    const alreadyEmail = await ctx.db.query.user({
      where: { email: args.email },
    });
    if (alreadyEmail) {
      throw new Error(`There's already a user registered with that email!`);
    }
    //hash their password
    const password = await bcrypt.hash(args.password, 10);
    //create user in db
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password,
          permissions: { set: ['USER'] },
        },
      },
      info
    );
    //create JWT for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //set JWT as a cookie on the response
    ctx.response.cookie("token", token, {
      // domain: '.lisa-alley.com',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
    });
    //Send a welcome email
    const mailResponse = await transport.sendMail({
      from: 'lisadianealley@gmail.com',
      to: user.email,
      subject: 'Welcome from Lisa Alley!',
      html: makeANiceEmail(
        `Thanks so much for signing up! \n\n You can browse all my prints <a href="${
          process.env.FRONTEND_URL
        }">here</a>. If you're interested in commission work, please get in touch directly!`
      ),
    });
    //Finally return user to browser
    return user;
  },
  updateUser(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateUser(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
  async signin(parent, { email, password }, ctx, info) {
    //check if user with this email
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }

    //check if pw is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    //generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    //Set cookie with token
    ctx.response.cookie("token", token, {
      // domain: '.lisa-alley.com',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    //Return the user
    return user;
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie("token", {
      // domain: '.lisa-alley.com',
    });
    return { message: 'Goodbye!' };
  },
  async requestReset(parent, args, ctx, info) {
    // Check if real user
    const user = await ctx.db.query.user({ where: { email: args.email } });
    if (!user) {
      throw new Error(`No such user for ${args.email}`);
    }
    // Set reset token & expiry
    const randomBytesPromise = promisify(randomBytes);
    const resetToken = (await randomBytesPromise(20)).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; //1 hr
    const res = await ctx.db.mutation.updateUser({
      where: { email: args.email },
      data: { resetToken, resetTokenExpiry },
    });
    // Email reset token
    const mailResponse = await transport.sendMail({
      from: 'lisadianealley@gmail.com',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: makeANiceEmail(
        `Your Password Reset Token Is Here! \n\n <a href="${
          process.env.FRONTEND_URL
        }/reset?resetToken=${resetToken}">Click Here To Reset!</a>`
      ),
    });
    // Return a message
    return { message: 'Thanks!' };
  },
  async resetPassword(parent, args, ctx, info) {
    //Check if passwords
    if (args.password !== args.confirmPassword) {
      throw new Error(
        `Somethings just a lil off - passwords must match. Please try again.`
      );
    }
    //Check if token is real
    const [user] = await ctx.db.query.users({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry_gte: Date.now() - 360000,
      },
    });
    if (!user) {
      throw new Error(`Invalid reset token`);
    }
    //Check if expired
    //Hash new pw
    const password = await bcrypt.hash(args.password, 10);
    //Save new pw to user and remove old reset token fields
    const updatedUser = await ctx.db.mutation.updateUser({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    //Generate JWT
    const token = jwt.sign({ userId: updatedUser.id }, process.env.APP_SECRET);
    //Set JWT Cookie
    ctx.response.cookie("token", token, {
      // domain: '.lisa-alley.com',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    //Return new user
    return updatedUser;
    //Have a beer lol
  },
  async updatePermissions(parent, args, ctx, info) {
    // 1. Check if they're logged in
    if (!ctx.request.userId) {
      throw new Error('You must be logged in!');
    }
    // 2. Query current user
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    );
    // 3. Check for appropriate permissions
    hasPermission(currentUser, ['ADMIN', 'PERMISSIONUPDATE']);
    // 4. Update permissions
    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
        },
        where: {
          id: args.userId,
        },
      },
      info
    );
  },
  async addToCart(parent, args, ctx, info) {
    //1. Make sure they're signed in
    let userId = ctx.request.userId;
    if (!userId) {
      //create a guest user!
      //generate random email
      const email = randomEmail({ domain: 'guest.com' }).toLowerCase();
      //generate and hash random password
      const password = await bcrypt.hash(generatePassword(), 10);
      const user = await ctx.db.mutation.createUser(
        {
          data: {
            email,
            password,
            name: 'Guest',
            address1: '300 Guest St',
            city: 'Guestington',
            state: 'Texas',
            zip: 11111,
            permissions: { set: ['GUEST'] },
          },
        },
        info
      );
      //create JWT token for guest
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
      //set token as cookie on res
      ctx.response.cookie('token', token, {
        // domain: '.lisa-alley.com',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, //1 day
      });
      userId = user.id;
    }
    //2. Query the users current cart
    const [existingCartItem] = await ctx.db.query.cartItems({
      where: {
        user: { id: userId },
        item: { id: args.id },
      },
    });
    //3. Check if that item is already in cart and increment if it is
    if (existingCartItem) {
      console.log('This item is already in their cart');
      return ctx.db.mutation.updateCartItem(
        {
          where: { id: existingCartItem.id },
          data: { quantity: existingCartItem.quantity + 1 },
        },
        info
      );
    }
    //4. If it's not, create a fresh cart item for that user!
    return ctx.db.mutation.createCartItem(
      {
        data: {
          quantity: 1,
          user: {
            connect: { id: userId },
          },
          item: {
            connect: { id: args.id },
          },
        },
      },
      info
    );
  },
  async removeFromCart(parent, args, ctx, info) {
    //1. Find the cart item
    const cartItem = await ctx.db.query.cartItem(
      {
        where: {
          id: args.id,
        },
      },
      `{ id, user { id }}`
    );
    if (!cartItem) {
      throw new Error('No Cart Item Found!');
    }
    //2. Make sure they own that cart item
    if (cartItem.user.id !== ctx.request.userId) {
      throw new Error(`That's my purse! I don't know you!`);
    }
    //3. Delete that cart item
    return ctx.db.mutation.deleteCartItem({ where: { id: args.id } }, info);
  },
  async createOrder(parent, args, ctx, info) {
    //1. Query current user and make sure they're signed in
    const { userId } = ctx.request;
    if (!userId) {
      throw new Error('You must be signed in to complete this order');
    }
    const user = await ctx.db.query.user(
      { where: { id: userId } },
      `{
        id
        name
        email
        cart {
          id
          quantity
          item {
            title
            price
            id
            description
            image
            largeImage
          }
        }
      }`
    );

    //2. Recalculate the total for the price
    const amount = user.cart.reduce(
      (tally, cartItem) => tally + cartItem.item.price * cartItem.quantity,
      500
    );
    console.log(`Going to charge for a total of ${amount}`);
    //3. Create the stripe charge (turn token into $$$$$)
    const charge = await stripe.charges.create({
      amount,
      currency: 'USD',
      source: args.token,
    });
    //4. Convert CartItems to OrderItems
    const orderItems = user.cart.map((cartItem) => {
      const orderItem = {
        ...cartItem.item,
        quantity: cartItem.quantity,
        user: { connect: { id: userId } },
      };
      delete orderItem.id;
      return orderItem;
    });
    //5. Create the Order
    const order = await ctx.db.mutation.createOrder({
      data: {
        total: charge.amount,
        view: 1,
        fulfilled: false,
        charge: charge.id,
        items: { create: orderItems },
        user: { connect: { id: userId } },
      },
    });
    //6. Clear user's cart, delete cartItems
    const cartItemIds = user.cart.map((cartItem) => cartItem.id);
    await ctx.db.mutation.deleteManyCartItems({
      where: { id_in: cartItemIds },
    });
    //7. Send e-mail confirmation to user
    const mailResponse = await transport.sendMail({
      from: 'lisadianealley@gmail.com',
      to: user.email,
      subject: 'Thank you for your order!',
      html: makeANiceEmail(
        `Thanks for your order! \n\n If you've signed up for an account, you can review your entire order <a href="${
          process.env.FRONTEND_URL
        }/order?id=${order.id}">here</a>.`
      ),
    });
    const adminMailResponse = await transport.sendMail({
      from: 'no-reply@lisa-alley.com',
      to: 'lisadianealley@gmail.com',
      subject: 'New Order Received!',
      html: makeANiceEmail(
        `You've receved a new order! \n\n You can review all your orders <a href="${
          process.env.FRONTEND_URL
        }/adminOrders">here</a>.`
      ),
    });
    //8. Return the order to the client
    return order;
  },
  updateOrder(parent, args, ctx, info) {
    const updates = { ...args };
    delete updates.id;
    return ctx.db.mutation.updateOrder(
      {
        data: updates,
        where: {
          id: args.id,
        },
      },
      info
    );
  },
};

module.exports = Mutations;
