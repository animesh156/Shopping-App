import { useEffect, useState } from "react";
import axios from "axios";
import { MdAdd } from "react-icons/md";
import { RiSubtractLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";

function ProductDetails() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Show 8 products per page
  const [loading, setLoading] = useState(true);

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
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://dummyjson.com/products/category/groceries"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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

  // Calculate products to display for pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle Next & Previous Page
  const nextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner text-info w-12"></span>
      </div>
    );

  return (
    <>
      <ToastContainer />

      <div className=" mt-5">
        <h1 className="md:text-3xl mb-3 text-xl font-bold text-center text-pink-500 uppercase">
          Groceries
        </h1>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-100  dark:bg-neutral-900 p-2 rounded-lg shadow-md w-72 flex flex-col items-center"
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

        {/* Pagination Controls */}
        <div className="flex justify-center mt-6 space-x-4 mb-5">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-400"
            }`}
          >
            Previous
          </button>
          <span className="px-4 py-2 font-semibold text-blue-700">
            Page {currentPage}
          </span>
          <button
            onClick={nextPage}
            disabled={
              currentPage >= Math.ceil(products.length / productsPerPage)
            }
            className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
              currentPage >= Math.ceil(products.length / productsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-400"
            }`}
          >
            Next
          </button>
        </div>

        {/* Product Details Modal */}
        {selectedProduct && (
          <dialog open={openModal} className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg text-pink-400">
                {selectedProduct.title}
              </h3>
              <p className="py-4 text-blue-600">
                {selectedProduct.description}
              </p>
              <div className="modal-action">
                <button
                  onClick={() => setOpenModal(false)}
                  className="btn btn-error"
                >
                  Close
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
