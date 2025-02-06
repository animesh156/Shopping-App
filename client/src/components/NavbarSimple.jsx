import { useNavigate } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import {useSelector} from 'react-redux'


function NavbarSimple() {

  const {user} = useSelector((state) => state.auth)

  const storedUser = localStorage.getItem("user");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  const avatar = parsedUser?.avatar || "/default-avatar.png";

  const navigate = useNavigate()


 
  if(!user) return <></>;

  return (
    <div className="navbar dark:bg-neutral-900 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
           <li>
            <a onClick={() => navigate('/products')}>Products</a>
          </li>
          <li>
          <a onClick={() => navigate('/mens')}>Men</a>
          </li>
          <li>
            <a onClick={() => navigate('/women')}>Women</a>
          </li>
          <li>
            <a onClick={() => navigate('/groceries')}>Groceries</a>
          </li>
          </ul>
        </div>
        <p className="font-bold">Ecommerce</p>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a onClick={() => navigate('/products')}>Products</a>
          </li>
          <li>
          <a onClick={() => navigate('/mens')}>Men</a>
          </li>
          <li>
            <a onClick={() => navigate('/women')}>Women</a>
          </li>
          <li>
            <a onClick={() => navigate('/groceries')}>Groceries</a>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-x-4">
        <a className="cursor-pointer" onClick={() => navigate('/cart')}><FiShoppingCart size={22} /></a>

        <div onClick={() => navigate('/profile')} className="avatar cursor-pointer avatar-placeholder">
  <div className="bg-neutral text-neutral-content w-8 rounded-full">
   <img src={avatar} alt="" />
  </div>
</div>
      </div>

      
    </div>
  );
}

export default NavbarSimple;
