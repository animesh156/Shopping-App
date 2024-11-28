import { Link } from "react-router-dom";
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
     <div className="home flex justify-center  items-center -mt-20 mb-20 h-screen flex-col ">
       

        <div  style={{ color: textColor, width: "330px" }} className="h-20 text-4xl mb-5  font-bold"  >
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


          <div>

          <Link to="/products">
            {" "}
            <Button color="blue" onClick={handleClick}>Shop Now </Button>
          </Link>

          </div>
          
          
        

       
      </div>

      <h3 className="text-center text-5xl font-extrabold mb-12">Our Latest Products</h3>

      <Carasouel />

      <Footer />
    </>
  );
}

export default Home;
