const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const makeANiceEmail = (text) => `
<div className="email" style="
  color: black;
  padding: 20px;
  font-family: sans-serif;
  line-height: 2;
  font-size: 16px  
  ">
  <p>
    Hi There!
  </p>
  <p>
    ${text}
  </p>

  <p>Thanks for shopping with me!</p>
  <p>
    Lisa Alley
  </p>
</div>
`;

exports.transport = transport;
exports.makeANiceEmail = makeANiceEmail;
