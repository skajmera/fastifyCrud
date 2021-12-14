const dotenv = require('dotenv').config()
exports.rout = (fastify, options) => {
  fastify.register(require("fastify-nodemailer"), {
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use TLS
    auth: {
      user: "subhashajmera2@gmail.com",
      pass: process.env.password,
    },
  });
};

exports.myfunction = (fastify, reply, req) => {
  let { nodemailer } = fastify;
  let recipient = req.params.email;
  fastify.nodemailer.sendMail(
    {
      from: "subhashajmera2@gmail.com",
      to: recipient,
      subject: "hii user this is nodemailer testing  ",
      text: "node js test code ",
    },
    (err, info) => {
      if (err) next(err);
      reply.send({
        messageId: info.messageId,
      });
    }
  );
};
