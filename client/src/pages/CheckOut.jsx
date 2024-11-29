import { useState, useEffect } from "react";
import {  Typography, Input, Alert } from "@material-tailwind/react";
import Card from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import axios from 'axios';

const CheckOut = () => {
  const [cvv, setCvv] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [focus, setFocus] = useState("");
  const [alertVisible, setAlertVisible] = useState(false); // New state for alert visibilitycons
  const [totalAmount, setTotalAmount] = useState(0)

  const getToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;
    }
    return null;
  };

  const token = getToken();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("https://shopping-app-backend-nine.vercel.app/products/items",    {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }); 
        
        
        const cart = response.data[0]; 
        console.log(response.data)
       
       
        setTotalAmount(cart.total);
        
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardholderName || !cardNumber || !cvv || !expirationDate) {
      window.alert("Please fill all the fields");
      return;
    }

    try {
    
      await axios.delete("https://shopping-app-backend-nine.vercel.app/products/clear",    {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); 

      // Show success alert
      setAlertVisible(true);

      // Reset form fields
      setCvv("");
      setCardNumber("");
      setCardholderName("");
      setExpirationDate("");
      setFocus("");
      setTotalAmount(0)
      

      // Hide the alert after a few seconds (optional)
      setTimeout(() => setAlertVisible(false), 2000);

    } catch (error) {
      console.error("Error clearing the cart:", error);
      window.alert("Payment succeeded, but failed to clear the cart");
    }
  };

  return (
    <>
    {alertVisible && (
        <Alert
           className="fixed bg-cyan-200 top-50 left-0 right-0 mx-auto w-full max-w-md z-50 text-center"
        >
          Payment Successful, Order Will Be Delivered In 10 Days
        </Alert>
      )}
   
    <div className="flex flex-col items-center lg:flex-row justify-evenly mt-20 space-y-8 lg:space-y-0">
      
      <div>
        <Card
          number={cardNumber}
          expiry={expirationDate}
          cvc={cvv}
          name={cardholderName}
          focused={focus}
          preview={true}
          issuer="visa"
        />
      </div>

      <div>
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="w-full max-w-sm px-3">
            <Typography
              variant="small"
              
              className="mb-1 block font-medium text-purple-400"
            >
              Cardholder Name
            </Typography>
            <Input
              placeholder="e.g John Doe"
              name="name"
              required
              className="appearance-none text-pink-400 border-cyan-300 !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "min-w-0",
              }}
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />

            <Typography
              variant="small"
             
              className="mb-1 mt-4 block font-medium text-purple-400"
            >
              Card Number
            </Typography>
            <Input
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              name="number"
              required
              className="appearance-none text-pink-400 !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              containerProps={{
                className: "min-w-0",
              }}
              value={cardNumber
                .replace(/\s/g, "")
                .replace(/(\d{4})/g, "$1 ")
                .trim()}
              onChange={(e) => setCardNumber(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />

            <div className="mt-4 flex">
              <div className="mr-4 w-full md:w-8/12">
                <Typography
                  variant="small"
                
                  className="mb-1 block font-medium text-purple-400"
                >
                  Expiration Date
                </Typography>
                <Input
                  placeholder="MM/YY"
                  maxLength={5}
                  pattern="\d{2}/\d{2}"
                  name="expiry"
                  required
                  className="appearance-none text-pink-400 !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  value={expirationDate
                    .replace(/[^0-9]/g, "")
                    .replace(/(\d{2})(\d{1,2})/, "$1/$2")
                    .substring(0, 5)}
                  onChange={(e) => setExpirationDate(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
              </div>
              <div className="w-auto md:w-4/12">
                <Typography
                  variant="small"
                 
                  className="mb-1 block font-medium text-purple-400"
                >
                  CVV
                </Typography>
                <Input
                  placeholder="123"
                  maxLength={3}
                  name="cvc"
                  pattern="\d{3}"
                  required
                  className="appearance-none text-pink-400 !border-t-blue-gray-200 placeholder:text-blue-gray-300  placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "!min-w-0",
                  }}
                  value={cvv.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1")}
                  onChange={(e) => setCvv(e.target.value)}
                  onFocus={(e) => setFocus(e.target.name)}
                />
              </div>
            </div>
            <div className="text-center">
             

              <button type="submit" className="text-white mt-4 bg-cyan-400 hover:bg-cyan-300 font-bold rounded-full text-md px-5 py-2.5 text-center me-2 mb-2 ">Pay ${totalAmount.toFixed(2)}</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default CheckOut;
