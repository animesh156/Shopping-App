import { Button, Avatar } from "@material-tailwind/react";
import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
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

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "https://shopping-app-backend-nine.vercel.app/products/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const cart = response.data[0];
        setOrderHistory(cart.total || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrderHistory();
  }, [token]);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const userName = user?.name || parsedUser?.name || "Guest";
  const avatar = user?.avatar || parsedUser?.avatar || "/default-avatar.png";

  return (
    <div className="flex items-center flex-col mt-20">
      <Avatar src={avatar} className="w-36 h-36"></Avatar>
      <h1 className="text-sm md:text-xl dark:text-pink-500 font-extrabold mb-6 mt-4">
        {userName}
      </h1>

      <Button
        onClick={onLogout}
        className="w-24 dark:bg-red-500 dark:hover:shadow-md dark:hover:shadow-red-300"
      >
        LogOut
      </Button>

      <Button onClick={() => setIsModalOpen(true)}>History</Button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Order History</h2>
            <ul className="max-h-64 overflow-y-auto">
              {orderHistory.length > 0 ? (
                orderHistory.map((item, index) => (
                  <li
                    key={index}
                    className="border-b py-2 text-sm"
                  >
                    {item}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No orders found.</li>
              )}
            </ul>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 dark:bg-gray-500"
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
