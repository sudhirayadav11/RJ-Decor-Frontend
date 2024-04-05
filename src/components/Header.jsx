import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { close, toggle } from "../redux/features/hamSlice";
import { userWishlist } from "../redux/wishlist/wishlistSlice";
import { RESET_AUTH, logout } from "../redux/user/userSlice";

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  console.log('login status :',isLoggedIn )
  const logoutUser = async () => {
    await dispatch(logout());
    await dispatch(RESET_AUTH());
    navigate("/login");
  };
  const [cartLength, setCartLength] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const isOpen = useSelector((state) => {
    return state.hamburger.value;
  });
  // Update cart length whenever cart items change
  useEffect(() => {
    setCartLength(cartItems.length);
  }, [cartItems]);

  let cart = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  const { wishitems } = useSelector((state) => ({ ...state.wishlist }));
  let wish = wishitems.length;
  useEffect(() => {
    dispatch(userWishlist());
  }, []);


  // Scroll to the top when the location changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <nav className="text-white py-2 bg-primary body-font topheader overflow-x-hidden  sticky top-0 w-full  z-[99] shadow-xl  overflow-hidden ">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          {/* logo and hamburger menu */}
          <div className="flex items-center  pt-2">
            <Link
              className="flex  font-medium items-center text-gray-900 mb-4 md:mb-0"
              to="/"
            >
              <img
                src="https://img.freepik.com/free-vector/furniture-logo-concept_23-2148634718.jpg?t=st=1710307787~exp=1710311387~hmac=5c38784ddf6bc10ffcc92246c0a6d713c9effed89237a8db50707c8245630e8e&w=740"
                className="w-14 h-14 mr-2  ml-2 text-primary  rounded-full"
                viewbox="0 0 24 24"
                alt="Logo"
              />
              <span className="text-white text-2xl font-semibold">
                RJ-Decor
              </span>
            </Link>
          </div>

          <div className="block lg:hidden">
            <button
              onClick={() => {
                dispatch(toggle());
              }}
              className="text-white focus:outline-none pe-3"
            >
              <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                ></path>
              </svg>
            </button>
          </div>

          {/* nav-items  mid  */}

          <div className="hidden lg:flex flex-grow justify-center font-medium  ">
            <Link
              to="/"
              activeClassName="active"
              className="mr-5 hover:text-third "
            >
              <div className="flex justify-center items-center gap-1 ">
                Home
              </div>
            </Link>
            <Link
              to="/products "
              activeClassName="active"
              className="mr-5 hover:text-third"
            >
              Products
            </Link>
            <Link
              to="/about"
              activeClassName="active"
              className="mr-5 hover:text-third"
            >
              About
            </Link>
            <Link
              to="/contact"
              activeClassName="active"
              className="mr-5 hover:text-third"
            >
              Contact
            </Link>
          </div>

          {/* nav-items  right  */}

          <div className="hidden lg:flex items-center   pr-8   ">
            <div className="flex items-center  space-x-4 ">
              <Link
                to="/wishlist"
                className="text-center text-white hover:text-sec transition relative"
              >
                <div className="text-2xl">
                  <i className="fa-regular fa-heart" />
                </div>

                <div className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-sec text-white text-xs">
                  {wish > 0 && <span className="wish">{wish}</span>}
                </div>
              </Link>

              <Link
                to="/cart"
                className="text-center text-white hover:text-sec transition relative"
              >
                <div className="text-2xl ">
                  <i className="fa-solid fa-bag-shopping" />
                </div>

                <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-sec text-white text-xs">
                  {/* {cart > 0  && <span className="cart">{cart.length}</span>} */}
                  {cartLength}
                </div>
              </Link>
            </div>

            {isLoggedIn ? (
              <>
                {" "}
                <Link
                  to="/"
                  onClick={logoutUser}
                  className=" hover:text-third transition"
                >
                 <p className="ps-4"> Logout</p>
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to="/login"
                  activeClassName="active"
                  className="ms-8 hover:text-third"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } bg-gray-100   text-primary lg:hidden py-5 mt-5 text-center font-medium`}
        >
          {/* Mobile menu content */}
          <Link
            to="/"
            className="block text-primary px-4 py-2 border-b border-sec"
            onClick={() => {
              dispatch(close());
            }}
          >
            Home
          </Link>
          <Link
            to="/product"
            className="block text-primary px-4 py-2 border-b border-sec"
            onClick={() => {
              dispatch(close());
            }}
          >
            Products
          </Link>
          <Link
            to="/about"
            className="block text-primary px-4 py-2 border-b border-sec"
            onClick={() => {
              dispatch(close());
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block text-primary px-4 py-2 border-b border-sec"
            onClick={() => {
              dispatch(close());
            }}
          >
            Contact
          </Link>

          <Link
            to="/login"
            className="block text-primary px-4 py-2 border-b border-sec"
            onClick={() => {
              dispatch(close());
            }}
          >
            Login
          </Link>
          <div className="flex items-center  space-x-4  justify-center mt-4">
            <Link
              to="/wishlist"
              className="text-center text-primary hover:text-primary transition relative"
              onClick={() => {
                dispatch(close());
              }}
            >
              <div className="text-2xl ">
                <i className="fa-regular fa-heart" />
              </div>

              <div className="absolute -right-2 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-sec text-white text-xs">
                {wish > 0 && <span className="wish">{wish}</span>}
              </div>
            </Link>
            <Link
              to="/cart"
              className="text-center text-primary hover:text-primary transition relative"
              onClick={() => {
                dispatch(close());
              }}
            >
              <div className="text-2xl ">
                <i className="fa-solid fa-bag-shopping" />
              </div>

              <div className="absolute -right-3 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-sec text-white text-xs">
                {cart > 0 && <span className="cart">{cart.length}</span>}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
