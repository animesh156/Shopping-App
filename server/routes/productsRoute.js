const express = require('express')
const router = express.Router();

const {addToCart,getCartItems, clearCart} = require('../controllers/CartController')
const carts = require('../models/CartModel')


 
router.get('/items',getCartItems)

router.post('/cart/add', addToCart)

router.delete('/clear', clearCart)







module.exports = router;