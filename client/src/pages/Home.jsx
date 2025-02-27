import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { TypeAnimation } from "react-type-animation";

import Footer from "../components/Footer";
import Carousel from "../components/Carasouel";

const latestProducts = [
  {
    name: "Apple MacBook Pro",
    image:
      "https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/3.png",
    desc: "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
  },

  {
    name: "Huawei Matebook X Pro",
    image:
      "https://cdn.dummyjson.com/products/images/laptops/Huawei%20Matebook%20X%20Pro/2.png",
    desc: "The Huawei Matebook X Pro is a slim and stylish laptop with a high-resolution touchscreen display, offering a premium experience for users on the go.",
  },

  {
    name: "Decoration Swing",
    image:
      "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/2.png",
    desc: "The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.",
  },

  {
    name: "House Showpiece Plant",
    image:
      "https://cdn.dummyjson.com/products/images/home-decoration/House%20Showpiece%20Plant/2.png",
    desc: "The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.",
  },

  {
    name: "Calvin Klein CK One",
    image:
      "https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/3.png",
    desc: "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
  },

  {
    name: "Dior J'adore",
    image:
      "https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/3.png",
    desc: "J'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.",
    category: "fragrances",
  },

  {
    name: "Microwave Oven",
    image:
      "https://cdn.dummyjson.com/products/images/kitchen-accessories/Microwave%20Oven/2.png",
    desc: "The Microwave Oven is a versatile kitchen appliance for quick and efficient cooking, reheating, and defrosting. Its compact size makes it suitable for various kitchen setups.",
    category: "kitchen-accessories",
  },

  {
    name: "Black Whisk",
    image:
      "https://cdn.dummyjson.com/products/images/kitchen-accessories/Boxed%20Blender/2.png",
    desc: "The Black Whisk is a kitchen essential for whisking and beating ingredients. Its ergonomic handle and sleek design make it a practical and stylish tool.",
  },
];

function Home() {
  const [textColor, setTextColor] = useState("red");

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center h-svh md:h-auto items-center opacity-85  bg-gradient-to-r from-pink-50 to-pink-200 m-auto md:justify-between border md:max-w-7xl md:rounded-2xl border-white mb-5 md:mt-3 ">
        <div className="text-center">
          <h1
            className=" font-extrabold md:text-7xl text-4xl mb-4 "
            style={{ color: textColor }}
          >
            Shopsy
          </h1>

          <div
            style={{ color: textColor, width: "350px" }}
            className="h-15 md:text-2xl mb-2  md:font-bold"
          >
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

          <button onClick={handleClick} className="bg-teal-600 mb-3 cursor-pointer md:mt-4 hover:bg-teal-800 py-1.5 px-2 md:py-1 md:px-2 rounded-md text-sm md:text-lg  ">
            Shop Now{" "}
          </button>
        </div>

        <div>
          <img src="/home.png" alt="" className="h-80 md:h-auto" />
        </div>
      </div>


      <h4 className="text-sm uppercase underline font-bold text-center">
        Collections
      </h4>
      <p className="text-center text-2xl  font-extrabold mb-6 mt-1 dark:text-sky-600">
        Our Top Collections
      </p>

      <Carousel />

      {/* Latest Products */}

      <h3 className="text-sm text-center uppercase font-bold mt-8 underline">
        New Arrival
      </h3>
      <p className="text-2xl font-extrabold text-sky-600 text-center">
        Latest Collections
      </p>

      <div className="flex flex-wrap justify-center gap-x-3 ">
        {latestProducts.map((product) => (
          <div
            className="card dark:bg-neutral-900 md:w-72 mt-4 w-40 mb-3 shadow-sm"
            key={product.id}
          >
            <figure className="bg-gradient-to-b opacity-70 from-pink-50 to-pink-200">
              <img src={product.image} alt="Shoes" />
            </figure>
            <div className="p-2">
              <h2 className="text-sm mb-1 font-medium text-sky-500">
                {product.name}
               
              </h2>
              <p className="text-xs mb-2">{product.desc}</p>
             
                <button className="bg-cyan-500 cursor-pointer text-black text-sm py-0.5 md:py-1.5 px-2 rounded-md hover:bg-cyan-600 ">Buy Now</button>
              
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Home;
