import { useEffect, useState } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";


function WomenProducts() {
  const categories = [
    { key: "womens-bags", label: "Bags" },
    { key: "womens-dresses", label: "Dresses" },
    { key: "womens-jewellery", label: "Jewellery" },
    { key: "womens-shoes", label: "Shoes" },
    { key: "womens-watches", label: "Watches" }
  ];

  const [activeTab, setActiveTab] = useState(categories[0].key);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  
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
    fetchProducts(activeTab);
  }, [activeTab]);

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: Math.max(1, (prevQuantities[productId] || 1) + delta),
    }));
  };

  const handleAddToCart = async (product) => {
    const {
      id,
      title,
      images: [image],
      price,
    } = product;
    const quantity = quantities[id] || 1;

    if (!token) {
      toast.error("Authentication error");
      return;
    }

    try {
      const response = await axios.post(
        "https://shopping-app-backend-tau.vercel.app/products/cart/add",
        {
          name: title,
          image,
          quantity,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setQuantities((prevQuantities) => ({
          ...prevQuantities,
          [id]: 1,
        }));

        toast.success("Item added to cart");
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response) {
        toast.error(
          error.response.data?.message || "Server error. Please try again"
        );
      } else {
        toast.error("Network erro, Check your internet connection");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 mt-5">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-blue-500 mb-6">
        Women&apos;s Products
      </h1>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 border-b-2 pb-2">
        {categories.map((category) => (
          <button
            key={category.key}
            onClick={() => setActiveTab(category.key)}
            className={`px-6 py-2 font-semibold rounded-t-lg ${
              activeTab === category.key
                ? "text-white bg-blue-500"
                : "text-gray-600 bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-900 hover:bg-gray-300"
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Product List */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[200px]">
        <span className="loading loading-spinner text-info w-14"></span>
        </div>
      ) : (
        <div className="flex mt-5 mb-5 flex-wrap justify-evenly gap-y-4">
        {products.map((product) => (
           <div
                       key={product.id}
                       className="bg-slate-100  dark:bg-neutral-900 p-2 rounded-lg shadow-md w-64 flex flex-col items-center"
                     >
                       <img
                         src={product.images[0]}
                         alt={product.title}
                         className="h-40  object-cover rounded"
                       />
                       <h2 className="md:text-balance text-center font-medium mt-2">
                         {product.title}
                       </h2>
                       <p className="dark:text-gray-300 font-medium">${product.price}</p>
         
                       <div className="flex items-center gap-2 my-2">
                         <span
                           onClick={() => handleQuantityChange(product.id, -1)}
                           className="border-2 cursor-pointer border-green-400 rounded-full  dark:text-red-500"
                         >
                           <RiSubtractLine size={22} />
                         </span>
                         <span className="text-blue-500 font-extrabold">
                           {quantities[product.id] || 1}
                         </span>
                         <span
                           onClick={() => handleQuantityChange(product.id, 1)}
                           className="border-2 cursor-pointer border-green-400 rounded-full dark:text-red-500"
                         >
                           <MdAdd size={22} />
                         </span>
                       </div>
         
                       <div>
                         <button
                           onClick={() => {
                             setSelectedProduct(product);
                             setOpenModal(true);
                           }}
                           className="mt-2 mr-3 px-4 cursor-pointer py-2 text-purple-600 border border-yellow-700 hover:bg-yellow-500 rounded-md"
                         >
                           Read More
                         </button>
         
                         <button
                           onClick={() => handleAddToCart(product)}
                           className="bg-sky-500 mt-3 cursor-pointer  px-4 py-2 rounded-md hover:bg-sky-700 mb-3"
                         >
                           Add To Cart
                         </button>
                       </div>
                     </div>
        ))}
      </div>
      )}

       {/* Product Details Modal */}
       {selectedProduct && (
  <dialog open={openModal} className="modal">
    <div className="modal-box">
      <h3 className="font-bold text-lg text-pink-400">
        {selectedProduct.title}
      </h3>
      <p className="py-4 text-blue-600">{selectedProduct.description}</p>
      <div className="modal-action">
        <button onClick={() => setOpenModal(false)} className="btn btn-error">
          Close
        </button>
      </div>
    </div>
  </dialog>
)}
    </div>
  );
}

export default WomenProducts;
