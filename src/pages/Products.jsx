import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaCartArrowDown } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { getProducts, searchProduct } from "../redux/product/productSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { addToCart } from "../redux/cart/cartSlice";

export default function Products() {
  const { products } = useSelector((state) => ({ ...state.products }));
  const { error } = useSelector((state) => ({ ...state.wishlist }));
  const [quantity, setQuantity] = useState(1);
  const [list, setList] = useState(products);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [priceRange, setPriceRange] = useState();
  const [price, setPrice] = useState();
  const [selectedColor, setSelectedColor] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let priceArr = products.map((item) => item.price);
  let maxPrice = Math.max(...priceArr);

  useEffect(() => {
    if (maxPrice) {
      setPrice(maxPrice);
    }
  }, [maxPrice]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  useEffect(() => {
    setList(products);
  }, [products]);
  useEffect(() => {}, [selectedCategory, priceRange, list]);

  //  search for products functions
  const handleSearch = async (e) => {
    e.preventDefault();

    if (search.trim() !== "") {
      const response = await dispatch(searchProduct(search));
      if (response.meta.requestStatus === "fulfilled") {
        setList(response.payload); // Update list state with search results
        navigate(`/products/search?searchQuery=${search}`);
      } else {
        // Handle if search request failed
        console.error("Search request failed");
      }
    } else {
      navigate("/productDetails");
    }
  };

  // get categorys
  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get(
        "http://localhost:5000/api/v1/getcategory"
      );
      setCategories(response.data.categories);
    };
    getCategories();
  }, []);

  const filterCategory = (cat_name) => {
    setSelectedCategory(cat_name);
  };

  const handlePrice = (e) => {
    setPrice(e.target.value);
    setPriceRange(e.target.value);

    let priceRangeValue = e.target.value;

    let priceFilter = products;

    if (priceRangeValue) {
      priceFilter = products.filter((item) => item.price <= priceRangeValue);
      setList(priceFilter);
    }
  };

  useEffect(() => {
    const applIFilters = () => {
      let productLists = products;

      if (selectedCategory) {
        productLists = productLists.filter(
          (item) => item.category === selectedCategory
        );
        setList(productLists);
      } else {
        setList(products);
      }
    };
    applIFilters();
  }, [products, selectedCategory]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error, toast]);

  // add to cart handler
  const addToCartHandler = (product) => {
    dispatch(addToCart({ ...product, product_id: product._id, qty: quantity }));
  };

  return (
    <>
      <div className="bg-gray-100 overflow-x-hidden overflow-hidden">
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-red-500 pb-6 pt-10">
            <h1 className="text-3xl font-bold tracking-tight text-sec ">
              Hot Sales Products
            </h1>

            <form
              onSubmit={handleSearch}
              method="GET"
              className="flex max-w-3xl"
            >
              <input
                type="text"
                name="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-[600px]  border-primary  "
                placeholder="Search products"
              />
              <button
                type="submit"
                className="bg-primary border border-primary text-white px-8 rounded-r-md hover:bg-transparent hover:text-primary transition"
              >
                Search
              </button>
            </form>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-2">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-4">
              {/*  Filters by Category and Price*/}
              <div className="flex flex-col w-1/3">
              
                {/* Category Filter */}
                <div className="w-full ">
                  <div className="category_box">
                    <h3 className="text-xl border-b-2 border-red-800 font-mono  mb-3    font-bold   ">
                      Category{" "}
                    </h3>
                    <div className=" py-2  text-sm ">
                      <span
                        onClick={() => filterCategory()}
                        className=" border pt-1 border-blue-900 px-1 pe-[72px] "
                      >
                        {" "}
                        All{" "}
                      </span>
                      {categories &&
                        categories.map((cat) => (
                          <span
                            className="flex flex-col border my-2 py-2 border-blue-900 px-1 hover:bg-blue-900 hover:text-white cursor-pointer"
                            key={cat._id}
                            onClick={() => filterCategory(cat.name)}
                          >
                            {cat.name}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Price Filter */}
                <div className="w-full ">
                  <div className="price_box">
                    <h3 className="text-xl border-b-2 border-red-800  font-mono     font-bold  my-2">
                      {" "}
                      Price{" "}
                    </h3>

                    <input
                      type="range"
                      min={1}
                      value={priceRange}
                      max={maxPrice}
                      onChange={handlePrice}
                    />
                    <h2> Rs.{price} </h2>
                  </div>
                </div>
              </div>

              {/* products grid page */}

              <div className="w-full lg:col-span-3 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                  {list.map((product) => (
                    <div
                      key={product._id}
                      className="bg-white shadow rounded overflow-hidden group"
                    >
                      <Link to={`/products/${product._id}`}>
                        <div className="prodimg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full"
                          />
                        </div>
                        <div className="pt-4 pb-3 px-4">
                          <a href="#">
                            <h4 className="uppercase  font-semibold text-xl mb-1 text-gray-700 hover:text-primary transition">
                              {product.name}
                            </h4>
                          </a>
                          <div className="flex items-baseline  space-x-2">
                            <p className="text-md text-primary font-semibold">
                              Rs. {product.price}
                            </p>
                          </div>
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
              </div>
              {/* products grid end */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
