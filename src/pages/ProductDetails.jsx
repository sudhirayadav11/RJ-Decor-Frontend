import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../redux/product/productSlice";
import { addToCart } from "../redux/cart/cartSlice";
import { addToWishlist } from "../redux/wishlist/wishlistSlice";
import Loader from "./../components/Loader";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(""); // Add selectedSize state

  const { product, loading } = useSelector((state) => ({ ...state.products }));
  const { wishitems, error } = useSelector((state) => ({ ...state.wishlist }));
  const { isLoggedIn } = useSelector((state) => state.user);


  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [id, getProductById]);

  // Check if the product is already in the wishlist
  const isProductInWishlist = (productName) => {
    return wishitems.some((item) => item.product_name === productName);
  };

  // add to wishlist
  const addWishlist = (e) => {
    e.preventDefault();

    if (isProductInWishlist(product.name)) {
      toast.error("Product already added wishlist");
    } else {
      dispatch(
        addToWishlist({
          product_name: product.name,
          product_price: product.price,
          product_category: product.category,
          product_image: product.image,
        })
      );
    }
  };

  // addd to cart
  const handleCart = (e) => {
    e.preventDefault();
    if(isLoggedIn){
      dispatch(addToCart({ ...product, qty: quantity }));

    }else{
      toast.error("Please log to add cart");
      navigate('/login')
    }
  };

  // color logic here start
  const staticColors = ["brown", "black", "gray"];
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    console.log("product selected color: " + product.colors);
  }, [product.colors]);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  // color logic  end

  // show sizes when product Bedroom  category is selected
  // const isBedroom = product && product.category === "Bedroom";
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes && product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]); // Initialize selectedSize
    }
  }, [product.colors, product.sizes]);

  return (
    <>
      {loading ? (
        <>
          <Loader />
        </>
      ) : (
        <>
          <div className="container mx-auto gap-6 py-4 overflow-x-hidden">
            <h1 className="text-3xl text-start  font-bold pb-4 text-sec">
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
                <p className="mt-2 text-gray-600">
                  <strong> Products Description: </strong>
                  {product.desc}
                </p>
              </div>

              {/* content  section start */}
              <div className="w-full lg:w-1/2 px-4">
                <h2 className="text-3xl font-semibold uppercase mb-2">
                  {product.name}
                </h2>
                <div className="flex items-center mb-2"></div>
                <div className="">
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
                <div className="flex items-baseline mb-1 space-x-2 font-roboto ">
                  <p className="text-md text-gray-700">
                    <span className="text-gray-800 font-semibold">Price:</span> Rs. {product.price}{" "}
                  </p>
                </div>
                <p className="my-1 text-gray-700">
                  <span className="text-gray-800 font-semibold">Brand: </span>
                  {product.brand}
                </p>
                <p className="my-1 text-gray-700">
                  <span className="text-gray-800 font-semibold">Material : </span>
                  {product.fabric}
                </p>

               
                <div className="">
                  {product.sizes && product.sizes.length > 0 && (
                    <div className="flex justify-start items-center">
                      <span className="text-gray-800 font-semibold">Sizes: </span>
                      <select
                        className="mx-2 px-4  border border-gray-300 rounded-md"
                        style={{
                          appearance: "none",
                          background: "none",
                          backgroundImage: "none",
                        }}
                        value={selectedSize} // Set the selected value
                        onChange={(e) => setSelectedSize(e.target.value)} // Update selected size
                      >
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>
                            {size}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* sizes displaying end */}

                <div className="space-y-2 ">
                  <div className="flex  flex-row justify-start items-center">
                  <p className="text-gray-800 font-semibold ">
                    <span className="text-gray-800 font-semibold">Available Color </span>{" "}
                    <span className=" text-gray-500">: {product.colors}</span>
                  </p>
                  </div>
                  

                  <div className="flex items-center">
                    <span className="text-gray-800 font-semibold">Select Color : </span> &nbsp;
                    {staticColors.map((color) => (
                      <button
                        key={color}
                        className={`h-6 w-6 rounded-full border ${
                          selectedColor === color
                            ? "border-primary"
                            : "border-gray-600"
                        } mr-2`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                      ></button>
                    ))}
                    <div
                      className="border border-gray-400 w-16 h-16 ml-16"
                      style={{ backgroundColor: selectedColor }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4 flex items-center">
                  <h3 className="text-sm text-gray-800 uppercase mb-1 me-4">
                    <span className="text-gray-800 font-semibold"> Quantity: </span>
                  </h3>

                  <div className="flex border border-blue-800 text-gray-800 divide-x divide-blue-900 w-max">
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
                      className="h-8 w-16 text-center border-r border-l border-blue-800"
                    />
                    <div
                      className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </div>
                  </div>
                </div>

                {/* action button */}
                <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                  <button
                    onClick={handleCart}
                    className="bg-primary border border-primary text-white px-4 py-1  rounded uppercase flex items-center text-sm gap-2 hover:bg-transparent hover:text-primary transition"
                  >
                    <i className="fa-solid fa-bag-shopping" /> Add to cart
                  </button>
                  <button
                    onClick={addWishlist}
                    className="border border-blue-700 text-gray-600 px-4 py-1 rounded uppercase flex items-center gap-2 hover:text-primary transition"
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
