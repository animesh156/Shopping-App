import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import NavbarSimple from "./components/NavbarSimple";
import CheckOut from "./pages/CheckOut";
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Router>
       
       <NavbarSimple />

        <div className="mt-5">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        </div>
      
      </Router>
    </>
  );
}

export default App;
