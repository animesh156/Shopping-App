const Cart = require("../models/CartModel");
const Order = require('../models/OrderModel')

const addToCart = async (req, res) => {
  const { name, price, quantity, image } = req.body;

  try {
    let cart = await Cart.findOne();

    // If no cart exists, create a new one
    if (!cart) {
      cart = new Cart({ items: [], total: 0 });
    }

     // Save the order

   
   

    // Check if the item already exists in the cart
    const existingItemIndex = cart.items.findIndex(item => item.name === name);

    if (existingItemIndex !== -1) {
      // Item already exists, update quantity and price
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = price; // Update price if needed
    } else {
      // Item does not exist, add as a new item
      const newItem = { name, price, quantity, image };
      cart.items.push(newItem);
    }

    // Recalculate total
    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );


    const newOrder = new Order({
      user,
      items: cart.items,
      
    });


    // Save the cart
    await cart.save();
    await newOrder.save();

    res.json(cart); // Return the updated cart
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};


const getCartItems = async (req, res) => {
  try {
    const cartData = await Cart.find();
    res.json(cartData);
  } catch (error) {
    res.status(501).json({ error: "server side error" });
    console.log(error);
  }
};





// get user's past order history

const getOrderHistory = async(req,res) => {
    const userId = req.user.id;

    try {
      const order = await Order.findOne({user: userId})
      res.json(order)
    } catch (error) {
      res.status(500).json('error fetching user order history')
    }
}



const clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne();

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Clear items and reset total
    cart.items = [];
    cart.total = 0;

    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart", error });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  clearCart,

  getOrderHistory
};
