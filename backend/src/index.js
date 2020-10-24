const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
const createServer = require("./createServer");
const db = require("./db");
const { request } = require("./db");

const server = createServer();

server.express.use(cookieParser());

//Decode JWT to get user ID on each request
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    req.userId = userId;
  }
  next();
});
//TODO use express middleware to populate current user
server.express.use(async (req, res, next) => {
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    `{ id, permissions, email, name }`
  );
  req.user = user;
  next();
});

let origin;

server.express.use(async (req, res, next) => {
  const allowedOrigins = ['https://lisa-alley.com/', 'https://store.lisa-alley.com', 'http://localhost:3000', 'http://localhost:7777'];
  origin = await req.headers.origin;
  console.log(origin);
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', "X-PINGOTHER,Content-Type,X-Requested-With,accept,Origin,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization")
    res.setHeader('Access-Control-Allow-Credentials', true)
  }
  next();
})

// start!
server.start(
  {
    cors: {
      credentials: true,
      origin,
    },
  },
  (deets) => {
    console.log(`Server is now running on port http://localhost:${deets.port}`);
  }
);
