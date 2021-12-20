const fastify = require("fastify")()
require("dotenv").config();
require("./mongo");
require('./utils/cron')
const PORT = process.env.PORT || 5000;
fastify.register(require("./user/user.routes"));
const{rout}=require('./utils/nodemailer')
const{passport}=require('./passportOAuth')
const{socket}=require('./socket')
socket(fastify)
rout(fastify)
passport(fastify)
fastify.listen(PORT,()=>{
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
})
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
