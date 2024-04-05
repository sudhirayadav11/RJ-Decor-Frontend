import "./App.css";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import ProductDetails from "./pages/ProductDetails";
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from "./pages/Contact";
import About from './pages/About';
import Wishlist from "./pages/Wishlist";
import Products from "./pages/Products";
import Success from './components/Success';
import Cancel from './components/Cancel';


function App() {
  return (
    <>
    
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products/>} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="/cancel" element={<Cancel/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ScrollToTop
        smooth
        color="white"
        width="40px"
        border-radius="50%"
        style={{ background: "blue" }}
      />
    </>
  );
}

export default App;
