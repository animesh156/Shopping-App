import { List, ListItem, Button, Spinner } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true)

  const getToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;
    }
    return null;
  };

  const token = getToken();


  // Fetch cart items on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://shopping-app-backend-tau.vercel.app/products/items",    {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); // Replace with your API endpoint
        
        // Assuming the API returns an array of cart documents, pick the first cart's items and total
        const cart = response.data[0]; 
        console.log(response.data)
      
        setCartItems(cart.items);
        setTotalAmount(cart.total);
        
      } catch (error) {
        console.error("Error fetching cart items:", error);

      }  finally{
        setLoading(false)
      }
    };

    fetchCartItems();
  }, []);

  if(loading) return <div className="flex items-center justify-center min-h-screen">
  <Spinner color="pink" className="h-32 w-32" />
</div>

  return (
    <>
      <h1 className="text-center mt-5 mb-4 text-4xl text-cyan-400 font-extrabold">
        User Cart
      </h1>

      <div className="h-96 md:h-80 overflow-y-scroll ">
      <List>
  {cartItems.length > 0 ? (
    cartItems.map((item) => (
      <ListItem
        key={item._id}
        className="grid grid-cols-2 sm:grid-cols-4 items-center gap-4 p-4 bg-teal-50 dark:bg-slate-800 border-b-2 dark:border-gray-500 border-gray-200"
      >
        {/* Image */}
        <div className="col-span-1 flex justify-center items-center">
          <img
            src={item.image}
            alt={item.name}
            className="h-12 w-12 object-contain"
          />
        </div>

        {/* Item Name */}
        <div className="col-span-1 text-center sm:text-left">
          <p className="text-sm sm:text-md font-bold text-pink-500">{item.name}</p>
        </div>

        {/* Price and Quantity */}
        <div className="col-span-1 text-center sm:text-left">
          <p className="text-sm sm:text-md font-semibold flex items-center justify-center sm:justify-start dark:text-yellow-400">
            ${item.price}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5 mx-2 text-pink-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            {item.quantity}
          </p>
        </div>

        {/* Total */}
        <div className="col-span-1 text-center sm:text-left">
          <p className="text-sm sm:text-md font-semibold text-gray-600 dark:text-amber-400 ">
            Total: ${item.price * item.quantity}
          </p>
        </div>
      </ListItem>
    ))
  ) : (
    <p className="text-center text-gray-500 dark:text-red-500 p-4">No items in the cart</p>
  )}
</List>

      </div>

      <div className="text-center">
        <p className="text-center text-xl font-extrabold mt-12 mb-5 dark:text-blue-600">
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
