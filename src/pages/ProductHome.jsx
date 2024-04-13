import React, { useEffect } from "react";
import { Link ,useNavigate, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartArrowDown, FaHeart } from "react-icons/fa";
import { getProducts } from "../redux/product/productSlice";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cart/cartSlice";

export default function ProductHome() {
  const navigate=useNavigate()
  const location = useLocation();
  const { products, error } = useSelector((state) => state.products); // Only select the first 8 products
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProducts());
    window.scrollTo(0, 0);
  }, [dispatch,location.pathname]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // add to cart handler
  const addToCartHandler = (product) => {
    if(isLoggedIn){
      dispatch(addToCart({ ...product, product_id: product._id, qty: 1 }));

    }else{
      toast.error("Please log to add cart");
      navigate('/login')

    }
  };


  const displayedProducts = products && products.slice(0, 8);


  return (
    <div className="bg-gray-100 overflow-x-hidden overflow-hidden">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-red-500 pb-6 pt-10">
          <h1 className="text-3xl font-bold tracking-tight text-sec">
            Featured Products
          </h1>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-2">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
            
            {displayedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded overflow-hidden group"
              >
                <Link to={`/products/${product._id}`} className="block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full prodimg"
                  />
                  <div className="pt-4 pb-3 px-4">
                    <h4 className="uppercase font-semibold text-xl mb-1 text-gray-700 hover:text-primary transition">
                      {product.name}
                    </h4>
                    <p className="text-md text-primary font-semibold">
                      Rs. {product.price}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-start items-center gap-4 px-4 pb-2">
                  <button
                    onClick={() => addToCartHandler(product)}
                    className="flex p-2 items-center justify-center w-8 h-8 text-white bg-primary rounded-full hover:bg-red-600 transition duration-300 focus:outline-none"
                  >
                    <FaCartArrowDown className="text-xl" />
                  </button>
                  <button className="flex p-2 items-center justify-center w-8 h-8 text-white bg-primary rounded-full hover:bg-red-600 transition duration-300 focus:outline-none">
                    <FaHeart className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
