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
// const fastify = require("fastify")
// require("dotenv").config();
// require("./mongo");
// const app=fastify()
// const PORT = process.env.PORT || 5000;
// const userRoutes=require("./user/user.routes")
// app.register(userRoutes,{prefix:'/user'})

// app.listen(PORT,()=>{
//   console.log('coonected..',PORT);
// })
