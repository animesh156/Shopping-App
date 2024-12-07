const Cart = require("../models/CartModel");
const Order = require("../models/OrderModel");

const addToCart = async (req, res) => {
  const { name, price, quantity, image } = req.body;

  try {
    const user = req.user.id ;
    if (!user) {
      return res.status(400).json({ message: "User ID is required" });
    }

    let cart = await Cart.findOne({ user });

    if (!cart) {
      cart = new Cart({ user, items: [], total: 0 });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.name === name
    );

    if (existingItemIndex !== -1) {
      cart.items[existingItemIndex].quantity += quantity;
      cart.items[existingItemIndex].price = price;
    } else {
      const newItem = { name, price, quantity, image };
      cart.items.push(newItem);
    }

    cart.total = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const newOrder = new Order({
      user,
      items: cart.items,
    });

    await cart.save();
    await newOrder.save();

    res.json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error);
    res
      .status(500)
      .json({ message: "Error adding item to cart", error: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const user = req.user?.id || req.body.userId;
    if (!user) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cartData = await Cart.findOne({ user });
    res.json(cartData);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching cart items", error: error.message });
    console.log(error);
  }
};

const getOrderHistory = async (req, res) => {
  const user = req.user?.id || req.body.userId;

  try {
    const orders = await Order.find({ user });
    res.json(orders);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error fetching user order history",
        error: error.message,
      });
  }
};

const clearCart = async (req, res) => {
  try {
    const user = req.user?.id || req.body.userId;

    let cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.total = 0;

    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res
      .status(500)
      .json({ message: "Error clearing cart", error: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  clearCart,
  getOrderHistory,
};
