const subscriptionController = require("./subscription.controller");
async function routes(fastify, options) {
  fastify.post("/payment", async (req, res) => {
    const result = await subscriptionController.payment(fastify, req);
    return res.send(result);
  });

  fastify.post("/product", async (req, res) => {
    const result = await subscriptionController.createProduct(fastify, req);
    return res.send(result);
  });

  fastify.post("/cancelSub", async (req, res) => {
    const result = await subscriptionController.cancelSubscription(
      fastify,
      req
    );
    return res.send(result);
  });

  fastify.delete("/deletePlan", async (request, response) => {
    const result = await subscriptionController.deletePlan(fastify, request);
    return response.send(result);
  });
}

module.exports = routes;

/*
{
    "stripeEmail": "subhash@gmail.com",
    "planName": "basic",
    "description": "subscription payment",
    "priceId": "price_1KAZ8XF72adyi7uKeEBUBPEh",
    "planPrice": 200,
    "currency": "USD",
    "name": "sk_jmera",
    "address": "510 Townsend St",
    "zip": "98140",
    "city": "San Francisco",
    "state": "California",
    "country": "United States",
    "cardNumber": "4242 4242 4242 4242",
    "expMonth": 5,
    "expYear": 2024,
    "cvc": 178,
    "productId": "prod_KqFd9OXhIXIhfE",
    "stripePlanId": "plan_KqFdNjGqvyRCGT"
}


//////////////////////////////////////////////

"priceId": "price_1KAZ8XF72adyi7uKeEBUBPEh",
    "subId": "sub_1KBDHFF72adyi7uKwvnrqpan",
    "periodStart": 1640588749,
    "periodEnd": 1672124749,
    "invoiceId": "in_1KBDHFF72adyi7uKVvfSBoU3",
    "amount": 20000
}
*/
