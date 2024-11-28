// src/components/NavbarSimple.js
import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

function NavList() {

  return (
    <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
        <Link to="/"  className="flex items-center text-blue-600 hover:text-blue-300 font-semibold transition-colors">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
       <Link to="/products"  className="flex items-center text-blue-600 hover:text-blue-300 font-semibold transition-colors">
          Products
        </Link>
      </Typography>


      


      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
       <Link to="/cart"  className="flex items-center text-blue-600 hover:text-blue-300 font-semibold transition-colors">
        Cart
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-medium"
      >
       <Link to="/checkout"  className="flex items-center text-blue-600 hover:text-blue-300 font-semibold transition-colors">
          Checkout
        </Link>
      </Typography>
    </ul>
  );
}

function NavbarSimple() {
  const [openNav, setOpenNav] = React.useState(false);

  const { user } = useSelector((state) => state.auth);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);


  if(!user) return <></>   // if user is not loggedIN then show nothing

  return (      // if user is  loggedIN then show navbar

    <Navbar className="mx-auto max-w-screen-xl sticky top-0 z-10 px-6 py-3">
      <div className="flex items-center justify-between text-pink-400">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5"
        >
         Ecommerce App
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
      </Collapse>
    </Navbar>
  );
}

export default NavbarSimple;
