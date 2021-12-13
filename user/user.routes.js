const userController = require("../user/user.controller");
const {authenticateToken}=require('../utils/jwt');
const {myfunction}=require('../utils/nodemailer')
async function routes(fastify, options) {
  fastify.get('/sendmail/:email', (req, reply, next) => {
    myfunction(fastify,reply,req)
  })

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
