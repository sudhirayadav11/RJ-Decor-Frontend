import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../redux/product/productSlice";
import { addToCart } from "../redux/cart/cartSlice";
import { addToWishlist } from "../redux/wishlist/wishlistSlice";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  const dispatch = useDispatch();
  const { product, loading } = useSelector((state) => ({ ...state.products }));
  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, getProductById]);

  // add to wishlist
  const addWishlist = (e) => {
    e.preventDefault();
    console.log("Adding to wishlist:", product);
    dispatch(
      addToWishlist({
        product_name: product.name,
        product_price: product.price,
        product_category: product.category,
        product_image: product.image,
      })
    );
  };

  // addd to cart
  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, qty: quantity }));
  };

  return (
    <>
      {loading ? (
        <>
          <div className="product_container">
            <h2> Loading... </h2>
          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto gap-6 py-10 overflow-x-hidden md:px-10">
            <h1 className="text-3xl  font-bold pb-4 text-sec">
              Product Details
            </h1>
            <div className="flex flex-col lg:flex-row gap-6">
              {/* image section start */}
              <div className="w-full lg:w-1/2 px-4">
                <img
                  src={product.image}
                  alt="product image"
                  className="w-full"
                />
              </div>


              {/* content  section start */}
              <div className="w-full lg:w-1/2 px-4">
                <h2 className="text-3xl font-medium uppercase mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center mb-4"></div>
                <div className="space-y-2">
                  <p className="text-gray-800 font-semibold space-x-2">
                    <span>Availability: </span>
                    <span className="text-green-600">In Stock</span>
                  </p>

                  <p className="space-x-2">
                    <span className="text-gray-800 font-semibold">
                      Category:
                    </span>
                    <span className="text-gray-600">{product.category}</span>
                  </p>
                </div>
                <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                  <p className="text-xl text-primary font-semibold">
                    Price: Rs. {product.price} <span className="text-red-600 text-md ms-2 line-through">2000 off</span>
                  </p>
                </div>
                <p className="my-1 text-gray-700">
                  <strong>Brand: </strong>
                  {product.brand}
                </p>
                <p className="mt-4 text-gray-600">
                  <strong>Description: </strong>
                  {product.desc}
                </p>

                <div className="pt-4">
                  <h3 className="text-md text-gray-800 mb-3 uppercase font-medium">
                    Color:{product.color}
                  </h3>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm text-gray-800 uppercase mb-1">
                    Quantity
                  </h3>

                  <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
                    <div
                      className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                      onClick={() =>
                        setQuantity(quantity > 1 ? quantity - 1 : quantity)
                      }
                    >
                      -
                    </div>
                    <input
                      type="text"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="h-8 w-16 text-center border-r border-l border-gray-300"
                    />
                    <div
                      className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                  <button
                    onClick={handleCart}
                    className="bg-primary border border-primary text-white px-4 py-1  rounded uppercase flex items-center text-sm gap-2 hover:bg-transparent hover:text-primary transition"
                  >
                    <i className="fa-solid fa-bag-shopping" /> Add to cart
                  </button>
                  <button
                    onClick={addWishlist}
                    className="border border-gray-300 text-gray-600 px-4 py-1 rounded uppercase flex items-center gap-2 hover:text-primary transition"
                  >
                    <i className="fa-solid fa-heart" /> Wishlist
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
