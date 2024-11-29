
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";
import Carasouel from "../components/Carasouel";
import Footer from "../components/Footer";

function Home() {
  const [textColor, setTextColor] = useState("red");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login')
  }
  return (
    <>
     <div className="flex flex-col items-center md:flex-row justify-around h-screen ">
       
      <div className="text-center">

      <h1 className="text-5xl mt-5 font-extrabold md:text-7xl mb-6 " style={{color: textColor}}>Shopsy</h1>

      <div  style={{ color: textColor, width: "330px" }} className="h-20 text-2xl mb-5  font-bold"  >
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Discover the Latest in Fashion!",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                () => setTextColor("blue"),
                "Exclusive Deals on Top Brands",
                1000,
                () => setTextColor("deeppink"),
                "Fresh Arrivals for Every Season!",
                1000,
                () => setTextColor("orange"),
              
               
              ]}
              wrapper="span"
              speed={50}
             
              repeat={Infinity}
            />
          </div>

          <Button color="blue" onClick={handleClick}>Shop Now </Button>

      </div>
      
          <div>

        
          <img
            src="/light-bg.jpg"
            alt="Fashion Light"
            className="block dark:hidden" // Show in light mode
          />
          <img
            src="/dark-bg.png"
            alt="Fashion Dark"
            className="hidden dark:block" // Show in dark mode
          />
         

          </div>
          
          
        

       
      </div>

      <h3 className="text-center text-2xl md:text-4xl font-extrabold mb-12 dark:text-sky-600">Our Latest Products</h3>

      <Carasouel />

      <Footer />
    </>
  );
}

export default Home;
