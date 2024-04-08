import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import { clearError, userWishlist } from "../redux/wishlist/wishlistSlice";
import { deleteWishlist } from "../redux/wishlist/wishlistSlice";

const Wishlist = () => {
  const { wishitems, error } = useSelector((state) => ({ ...state.wishlist }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
      navigate("/");
    }
    dispatch(userWishlist());
  }, [dispatch, toast, error]);

  const deleteWishlistHandler = (id) => {
    dispatch(deleteWishlist({ id }));
  };
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto py-10 ">
          <div className=" pb-8">
            <h1 className="font-bold text-2xl border-b-2 pb-2">
              Your Favoutite Wishlist
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {wishitems?.length === 0 ? (
              <div className="alert_box">
                <h2 className="empty">Wishlist is Empty</h2>
              </div>
            ) : (
              <>
                {wishitems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg p-2 shadow-md"
                  >
                    <img
                      src={item.product_image}
                      alt="Product Image "
                      className="mx-auto mb-4 prodimg"
                    />
                    <h2 className="text-xl font-semibold mb-2">
                      {item.product_name}
                    </h2>
                    <p className="text-gray-600">{item.product_description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        <FaCartArrowDown className="mr-2 inline" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => deleteWishlistHandler(item._id)}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        <MdDeleteForever className="mr-2 inline" />
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;
