import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NavbarSimple from "./components/NavbarSimple";
import CheckOut from "./pages/CheckOut";
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from "./pages/Profile";
import MenProducts from "./components/MenProducts";
import WomenProducts from "./components/WomenProducts";
import Groceries from "./components/Groceries";

function App() {
  return (
    <>
      <Router>
       
       <NavbarSimple />

      

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mens" element={<MenProducts />} />
          <Route path="/women" element={<WomenProducts />} />
          <Route path="/groceries" element={<Groceries />} />
        </Routes>

       
      
      </Router>
    </>
  );
}

export default App;
