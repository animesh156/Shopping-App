import { List, ListItem, Card, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://shopping-app-backend-nine.vercel.app/products/items"); // Replace with your API endpoint
        
        // Assuming the API returns an array of cart documents, pick the first cart's items and total
        const cart = response.data[0]; 
        console.log(response.data)
      
        setCartItems(cart.items);
        setTotalAmount(cart.total);
        
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <>
      <h1 className="text-center text-4xl text-cyan-200 font-bold">
        Shopping Cart
      </h1>

      <Card className="w-auto m-auto h-72 overflow-y-scroll bg-b">
        <List>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ListItem key={item._id} className="flex justify-between text-pink-400 bg-teal-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-10 w-12"
                />
                <p className="text-md font-extrabold">{item.name.length > 10 ? item.name.substring(0, 7) + "..." : item.name}</p>
                <p className="text-md font-semibold flex items-center justify-center">
  ${item.price} 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 mx-2">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
  </svg> 
  {item.quantity}
</p>

               
                <p className="text-md font-semibold">
                  Total: ${item.price * item.quantity}
                </p>
              </ListItem>
            ))
          ) : (
            <p className="text-center text-gray-500">No items in the cart</p>
          )}
        </List>
      </Card>

      <div className="text-center">
        <p className="text-center text-3xl font-bold mt-12 mb-5">
          Total Amount: ${totalAmount.toFixed(2)}
        </p>

        <Link to='/checkout'>
          <Button color="green">Proceed to Checkout</Button>
        </Link>
      </div>
    </>
  );
}

export default Cart;
