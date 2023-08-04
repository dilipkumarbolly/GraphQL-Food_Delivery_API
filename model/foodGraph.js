const mongoose = require("mongoose");
mongoose
  .connect("mongodb://0.0.0.0:27017/FoodGraphQL")
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  id: String,
  name: String,
  location: String,
  isDeleted: { type: Boolean, default: false },
});

const deliveryBoySchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number,
  gender: String,
  Status: { type: String, default: "Available" },
  isDeleted: { type: Boolean, default: false },
});

const menudetailsSchema = new mongoose.Schema({
  itemId: String,
  itemName: String,
  category: String,
  price: String,
  isDeleted: { type: Boolean, default: false },
});

const orderdetailsSchema = new mongoose.Schema({
  orderId: String,
  user: {
    userId: String,
    userName: String,
    cart: [
      {
        itemID: String,
        itemName: String,
        category: String,
        Price: String,
      },
    ],
  },
  deliveryDetails: {
    deliveryPersonId: String,
    deliveryPersonName: String,
    deliveryLocation: String,
  },
  noOfItems: String,
  totalAmount: String,
  isDeleted: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
const DelBoy = mongoose.model("DelBoy", deliveryBoySchema);
const Menu = mongoose.model("Menu", menudetailsSchema);
const Order = mongoose.model("orders", orderdetailsSchema);

module.exports = { User, DelBoy, Menu, Order };
