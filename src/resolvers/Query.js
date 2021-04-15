const { forwardTo } = require("prisma-binding");
const { hasPermission } = require("../utils");

const Query = {
  items: forwardTo("db"),
  item: forwardTo("db"),
  itemsConnection: forwardTo("db"),
  ordersConnection: forwardTo("db"),
  me(parent, args, ctx, info) {
    //check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: { id: ctx.request.userId },
      },
      info
    );
  },
  async users(parent, args, ctx, info) {
    //check if they are logged in
    if (!ctx.request.userId) {
      throw new Error("You must be logged in!");
    }
    //check if user has permission to query all users
    hasPermission(ctx.request.user, ["ADMIN", "PERMISSIONUPDATE"]);
    //if they do, query all users
    return ctx.db.query.users({}, info);
  },
  // async items(parent, args, ctx, info) {
  //   const items = await ctx.db.query.items();
  //   return items;
  // },
  async order(parent, args, ctx, info) {
    //1. Make sure they're logged in
    if (!ctx.request.userId) {
      throw new Error(`You aren't even logged in lol`);
    }
    //2. Query current order
    const order = await ctx.db.query.order(
      {
        where: { id: args.id },
      },
      info
    );
    //3. Check permissionas
    const ownsOrder = order.user.id === ctx.request.userId;
    const hasPermissionToSeeOrder = ctx.request.user.permissions.includes(
      "ADMIN"
    );
    if (!ownsOrder &&
       !hasPermissionToSeeOrder) {
      throw new Error(`You can't see this bud!`);
    }
    //4. Return order
    return order;
  },
  async orders(parent, args, ctx, info) {
    const { userId } = ctx.request;
    //Check login
    if (!ctx.request.userId) {
      throw new Error(`You aint even logged in, my friend!`);
    };
    if (ctx.request.user.permissions.includes("ADMIN")) {
      return ctx.db.query.orders({
        where: { view: 1 }
      }, info);
    }
    //Query all orders
    return ctx.db.query.orders({
      where: {
        user: { id: userId },
      },
    }, info);
  },

};

module.exports = Query;
