// fastify.register(require('fastify-stripe'), {
//     apiKey: 'sk_test_51Jts6FF72adyi7uKX7mUJimPxBNK8Ek9sixMNOHsusMaQ2MX5QStxCrDYXoE6mUBjDCwpE0l1FrsoHZQRqeCP3uF00nmrS9JRi'
//   })

exports.customer1=(fastify, options)=> {
    const { stripe } = fastify
    const createCustomers = stripe.customers.create({ email:'subh@gmail.com',
        description: 'this is fastify customer',//req.body.description,
        name: 'subhash',//req.body.name,
        address: {
          line1: 'amla',//req.body.address,
          postal_code: '455336',//req.body.zip,
          city: 'dewas',//req.body.city,
          state: 'madhyapradesh',//req.body.state,
          country:'india',// req.body.country,
        }
    })
    return createCustomers;
};

const createPlan = async (stripe,data) => {
    const plan = await stripe.plans.create({
      amount: data.planPrice * 100,
      currency: data.currency,
      interval: "year",
      interval_count: data.stripeDuration,
      product: data.productId,
    });
    data.stripePlanId = plan.id;
    return data;
  };
  

const createProduct = async (stripe,req) => {
    const resp = await stripe.products.create({
      name: req.body.planName,
      description: req.body.description,
    });
    return resp;
  };
  
  const price = async (stripe,resp, req) => {
    const res = await stripe.prices.create({
      unit_amount: req.body.planPrice * 100,
      currency: req.body.currency,
      recurring: { interval: "year" },
      product: resp.id,
    });
    return res;
  };
  
  const creatp = async (stripe,res, resp, req) => {
    req.body.productId = resp.id;
    req.body.priceId = res.id;
    const result = await createPlan(stripe,req.body);
    return result;
  };
  
  module.exports={creatp,price,createProduct}