const subscriptionDataAccess = require("./subscription.dal");

exports.payment = async (fastify, req) => {
  const { stripe } = fastify;
  const customer = await subscriptionDataAccess.customers(stripe, req);
  const result = await subscriptionDataAccess.card(stripe, customer, req);
  const subscription = await subscriptionDataAccess.toke(stripe, result, req);
  const sub = await subscriptionDataAccess.subscriptionData(
    stripe,
    subscription,
    req
  );
  const subData = await subscriptionDataAccess.subId(sub);
  // subData.createTime = momen().tz("Asia/Kolkata").format("YYYY-MM-DD");
  // subData.isoDate = momen().tz("Asia/Kolkata").format("YYYY-MM-DD") + "T00:00:00Z";
  subData.amount = sub.plan.amount;
  // return await subscriptionDataAccess.storeData(subData);
  return await subData;
};

exports.createProduct = async (fastify, req) => {
  const { stripe } = fastify;
  const data1 = await subscriptionDataAccess.createProduct(stripe, req);
  const data2 = await subscriptionDataAccess.price(stripe, data1, req);
  return await subscriptionDataAccess.creatp(stripe, data2, data1, req);
};

exports.cancelSubscription = async (fastify, req) => {
  const { stripe } = fastify;
  return await subscriptionDataAccess.cancelSub(stripe, req);
};

exports.deletePlan = async (fastify, req) => {
  const { stripe } = fastify;
  return await subscriptionDataAccess.delPlan(stripe, req);
};
