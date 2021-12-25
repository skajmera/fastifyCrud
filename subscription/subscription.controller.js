const subscriptionDataAccess = require("./subscription.dal");
exports.payment = async (fastify) => {
  const customer = await subscriptionDataAccess.customer1(fastify);
  return await customer
}

exports.createProduct = async (fastify,req) => {
    const { stripe } = fastify
    const data1 = await subscriptionDataAccess.createProduct(stripe,req);
    const data2 = await subscriptionDataAccess.price(stripe,data1, req);
    return await subscriptionDataAccess.creatp(stripe,data2, data1, req);
  };