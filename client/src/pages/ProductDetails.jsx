import { Alert } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner
} from "@material-tailwind/react";
import { MdAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";

function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [quantities, setQuantities] = useState({});
  const [alertVisible, setAlertVisible] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate();

  const getToken = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser.token;
    }
    return null;
  };

  const token = getToken();


  const categoryMapping = {
    "men's clothing": "Men",
    "women's clothing": "Women",
    "jewelery": "Jewelry",
    "electronics": "Electronics",
  };

  useEffect(() => {
    axios
      .get("https://shopping-app-backend-nine.vercel.app/products",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setProducts(response.data);
        const uniqueCategories = [
          "All",
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        const initialQuantities = {};
        response.data.forEach((product) => {
          initialQuantities[product.id] = 1;
        });
        setQuantities(initialQuantities);
        setLoading(false)
      })
      .catch(() => setLoading(false) );
  }, []);

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, prevQuantities[productId] + delta),
    }));
  };

  const handleAddToCart = async (product) => {
    const { id, title, image, price } = product;
    const quantity = quantities[id];

    try {
      const response = await axios.post("https://shopping-app-backend-nine.vercel.app/products/cart/add", {
        name: title,
        image,
        quantity,
        price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
        }, 3000);
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: 1,
        }));
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Error adding item to cart");
    }
  };

  const handleBuyNow = async (product) => {
    const { id, title, image, price } = product;
    const quantity = quantities[id];

    try {
      const response = await axios.post("https://shopping-app-backend-nine.vercel.app/products/cart/add", {
        name: title,
        image,
        quantity,
        price,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        navigate("/cart");
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: 1,
        }));
      } else {
        alert("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  if(loading) return <div className="flex items-center justify-center min-h-screen">
  <Spinner color="pink" className="h-32 w-32" />
</div>

  return (
    <div>
      {alertVisible && (
        <Alert className="fixed bg-yellow-400 top-0 left-0 right-0 mx-auto w-full max-w-md z-50 text-center">
          Item added to cart successfully!
        </Alert>
      )}

      <div className="flex justify-center gap-2 my-2 overflow-x-scroll md:overflow-x-auto">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`cursor-pointer font-bold py-2 px-1 md:px-4 rounded-lg list-none whitespace-nowrap ${
              selectedCategory === category
                ? "bg-teal-200 text-white"
                : "bg-transparent text-yellow-800 hover:bg-blue-100 hover:text-blue-500"
            } transition-all duration-300 ease-in-out`}
          >
            {category === "All" ? category : categoryMapping[category] || category}
          </li>
        ))}
      </div>

      <div className="flex flex-wrap justify-evenly gap-y-4">
        {filteredProducts.map((product) => (
         <div
         key={product.id}
         className="card bg-base-100 w-80 h-auto shadow-xl mt-4 border-gray-400 dark:bg-blue-gray-900 border-2"
       >
         <figure className="px-10 pt-10">
           <img
             src={product.image}
             alt={product.title}
             className="rounded-xl w-36 h-40 mx-auto"
           />
         </figure>
         <div className="card-body flex flex-col justify-center items-center text-center">
           <h6 className="card-title overflow-clip dark:text-white text-sm mt-4">
             {product.title}
           </h6>
           <p className="font-extrabold text-deep-orange-500 mb-3 mt-2">${product.price}</p>
       
           <button
             onClick={() => handleOpenModal(product)}
             type="button"
             className="text-purple-600 border border-yellow-700 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
           >
             Read More
           </button>
       
           <div className="flex items-center gap-2 my-2">
             <span
               onClick={() => handleQuantityChange(product.id, -1)}
               className="border-2 cursor-pointer border-green-400 rounded-full  dark:text-red-500"
             >
              <RiSubtractLine size={22} />
             </span>
             <span className="text-blue-500 font-extrabold">
               {quantities[product.id]}
             </span>
             <span
               onClick={() => handleQuantityChange(product.id, 1)}
               className="border-2 cursor-pointer border-green-400 rounded-full dark:text-red-500"
             >
              <MdAdd size={22} />
             </span>
           </div>
       
           <div className="flex mt-4">
             <button
               type="button"
               className="text-white mr-4 bg-pink-400 hover:bg-pink-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
               onClick={() => handleAddToCart(product)}
             >
               Add To Cart
             </button>
             <button
               type="button"
               onClick={() => handleBuyNow(product)}
               className="text-white bg-cyan-400 hover:bg-cyan-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
             >
               Buy Now
             </button>
           </div>
         </div>
       </div>
       
        ))}
      </div>

      {selectedProduct && (
        <Dialog
          open={openModal}
          handler={handleCloseModal}
          animate={{
            mount: { scale: 1, y: 0 },
            unmount: { scale: 0.9, y: -100 },
          }}
        >
          <DialogHeader className="text-pink-400">{selectedProduct.title}</DialogHeader>
          <DialogBody className="text-blue-600">{selectedProduct.description}</DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleCloseModal} className="mr-1">
              Close
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </div>
  );
}

export default ProductDetails;
