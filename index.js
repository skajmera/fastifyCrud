const fastify = require("fastify")({ logger: true });
require("dotenv").config();
require("./mongo");
const PORT = process.env.PORT || 5000;
fastify.register(require("./user/user.routes"));
const startServer = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
startServer();

/////////////////////////////
// require('./mongo')
// const fastify = require('fastify')({ logger: true })
// fastify.register(require('./user/user.routes'));

// fastify.get('/',function (req, reply) {
//   console.log(req.body);
//   reply.send({ hello: 'world!'})
// })

// fastify.post('/users',function (req, reply) {
//     console.log(req.body);
//     reply.send({ hello: 'world!' })
//   })

// fastify.listen(3000,()=>{
//     console.log("connected...");
// })
