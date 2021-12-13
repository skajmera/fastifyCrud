const userController = require("../user/user.controller");
const {authenticateToken}=require('../utils/jwt')
const {myfunction}=require('../utils/nodemailer')
myfunction(5)
async function routes(fastify, options) {

  //////////////////////////////////////////////////////////////
  fastify.register(require('fastify-nodemailer'), {
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'subhashajmera2@gmail.com',
        pass: 's5@9009120899'
    }
  })
  fastify.get('/sendmail/:email', (req, reply, next) => {
    let { nodemailer } = fastify
    let recipient = req.params.email
    fastify.nodemailer.sendMail({
      from: 'subhashajmera2@gmail.com',
      to: recipient,
      subject: 'foo',
      text: 'bar'
    }, (err, info) => {
      if (err) next(err)
      reply.send({
        messageId: info.messageId
      })
    })
  })
  //////////////////////////////////////////////////////////
  fastify.get("/", {preHandler:authenticateToken},async (req, res) => {
    return ({ hello: "subhash" });
  });

  fastify.post("/insertData", async (req, res) => {
    const result = await userController.createUser(req);
    return res.send(result);
  });

  fastify.post("/getUserById", async (request, response) => {
    const result = await userController.getUser(request);
    return response.send(result);
  });

  fastify.put("/updateById",  {preHandler:authenticateToken},async (req, res) => {
    const result = await userController.updateUser(req);
    return res.send(result);
  });

  fastify.delete("/deleteById", {preHandler:authenticateToken}, async (req, res) => {
    const result = await userController.deleteUser(req);
    return res.send(result);
  });
}

module.exports = routes;
