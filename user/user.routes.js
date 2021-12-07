const userController = require("../user/user.controller");

async function routes(fastify, options) {
  fastify.get("/", async (req, res) => {
    return { hello: "subhash" };
  });

  fastify.post("/insertData", async (req, res) => {
    const result = await userController.createUser(req);
    return res.send(result);
  });

  fastify.post("/getUserById", async (request, response) => {
    const result = await userController.getUser(request);
    return response.send(result);
  });

  fastify.put("/updateById", async (req, res) => {
    const result = await userController.updateUser(req);
    return res.send(result);
  });

  fastify.delete("/deleteById", async (req, res) => {
    const result = await userController.deleteUser(req);
    return res.send(result);
  });
}

module.exports = routes;
