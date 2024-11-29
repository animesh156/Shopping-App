// models/Cart.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String,
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Cart', CartSchema);
