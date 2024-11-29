
import {  Button, Avatar,} from "@material-tailwind/react";
import { logout, reset } from '../features/auth/authSlice'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Profile = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  
  const { user } = useSelector((state) => state.auth);

  

  
  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }


  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  // Extract `name` and `avatar` from localStorage or set defaults
  const userName = user?.name || parsedUser?.name || "Guest";
  const avatar = user?.avatar || parsedUser?.avatar || "/default-avatar.png"; // Use a default avatar if none is provided

  

  return (
    <div className="flex  items-center flex-col mt-20 ">
      

     <Avatar src={avatar} className="w-36 h-36"></Avatar>
      
      <h1 className="text-sm md:text-xl dark:text-pink-500 font-extrabold mb-6 mt-4">{userName}</h1>

      <Button onClick={onLogout} className="w-24 dark:bg-red-500 dark:hover:shadow-md dark:hover:shadow-red-300">LogOut</Button>

    

     
    </div>
  );
};

export default Profile;
