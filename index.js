const fastify = require("fastify")();
require("dotenv").config();
require("./mongo");
require("./utils/cron");
/////
fastify.register(require('fastify-stripe'), {
  apiKey: process.env.skTestKey
})

const subscription=require("./subscription/subscription.router")
fastify.register(subscription,{prefix:'/subscription'})
/////
const PORT = process.env.PORT || 5000;
fastify.register(require("./user/user.routes"));
const { rout } = require("./utils/nodemailer");
const { passport } = require("./passportOAuth");
const { socket } = require("./socket");
socket(fastify);
rout(fastify);
passport(fastify);
fastify.listen(PORT, () => {
  console.log(`Server listening at http://127.0.0.1:${PORT}`);
});
/////////////////////////////
// const userRoutes=require("./user/user.routes")
// app.register(userRoutes,{prefix:'/user'})

// const moment=require('moment')
// const da={date: new Date(),
// expiryDate: new Date(moment().add(1, 'y').format('YYYY-MM-DD'))}
// console.log(da)