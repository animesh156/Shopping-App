
import { logout, reset } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify'


const Profile = () => {


  const dispatch = useDispatch();
  const navigate = useNavigate();


  const { user } = useSelector((state) => state.auth);


  const onLogout = () => {
    toast.success('Logged out sucessfully')
    setTimeout(() => {
      dispatch(logout());
      dispatch(reset());
      navigate("/");
    },1000)
    
  };

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const userName = user?.name || parsedUser?.name || "Guest";
  const avatar = user?.avatar || parsedUser?.avatar || "/default-avatar.png";

  return (
    <div className="flex items-center flex-col mt-20">
      <ToastContainer />
      <img src={avatar} className="w-36 h-36"></img>
      <h1 className="text-sm md:text-xl dark:text-pink-500 font-extrabold mb-6 mt-4">
        {userName}
      </h1>

      <button
        onClick={onLogout}
        className="w-24 bg-red-500 hover:shadow-md py-1 hover:shadow-red-300"
      >
        LogOut
      </button>

     

    
    </div>
  );
};

export default Profile;
