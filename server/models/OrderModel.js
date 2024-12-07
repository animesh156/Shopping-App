const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      image: { type: String },
    },
  ],
  
  createdAt: { type: Date, default: Date.now },
    }
)

module.exports = mongoose.model('Order', OrderSchema)