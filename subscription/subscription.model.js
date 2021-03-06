const mongoose = require("mongoose");
const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  address: {
    type: String,
  },
  name: {
    type: String,
  },
  stripeEmail:{
    type:String
  },
  subId:{
    type:String
  },
  priceId:{
    type:String
  },
  createTime:{
    type:String
  },
  isoDate:{
    type:String
  },
  longestStreak:{
    type:String
  },
  currentStreak:{
    type:String
  },
  amount:{
    type:Number
  }
});

const Subscription = mongoose.model("subscriptionStripe", subscriptionSchema);
module.exports = Subscription;
