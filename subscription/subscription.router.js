const subscriptionController = require("./subscription.controller");
async function routes(fastify, options) {
  fastify.get("/customer", async (req, res) => {
    const result = await subscriptionController.payment(fastify);
    console.log(result);
    return res.send(result);
  });

  fastify.post("/product", async (req, res) => {
    const result = await subscriptionController.createProduct(fastify,req);
    return res.send(result);
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
*/