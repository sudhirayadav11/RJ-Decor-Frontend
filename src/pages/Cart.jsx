import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  clearCart,
  decreaseQuantity,
  removeCartItem,
} from "../redux/cart/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import  axios  from 'axios';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const { _id } = user;

  const { cartItems, cartError } = useSelector((state) => ({
    ...state.cart,
  }));
  useEffect(() => {
    if (!user) cartError && toast.error(cartError);
  }, [user, cartError]);

  function totalPrice() {
    let x = 0;
    // eslint-disable-next-line
    cartItems.map((totalP) => {
      x += totalP.price * totalP.qty;
    });
    return x;
  }

  const increaseQty = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decreaseQty = (id) => {
    const item = cartItems.find((item) => item._id === id);
    if (item.qty > 1) {
      dispatch(decreaseQuantity(id));
    }
  };

  const removeItem = (id) => {
    dispatch(removeCartItem(id));
  };



  // payment  integration
  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51P0M0uA9t10f3qsTEvhqQ0MbCZIAz9RoRgNWaIsOQeTSLiDrkwmtIFbIb347TrmRhAc4100aYdhDCdAIURCCKZLi00cxIciGJl"
    );
    try {
      const body = { productsdata: cartItems };
      console.log(body.productsdata);
      const headers = {
        "content-type": "application/json",
      };
      // Make POST request to your backend API
      const response = await axios.post(
        "http://localhost:5000/api/v1/checkout",
        {
          method: "POST",
          headers: headers,
          body: JSON.stringify(body.productsdata),
        }
      );
      const session = await response.data;
      console.log('Session created', session)

      const result =await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      console.log("results", result);

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="grid lg:grid-cols-3 container mx-auto">
        <div className="lg:col-span-2 p-10 bg-white overflow-x-auto">
          <div className="flex border-b pb-4">
            <h2 className="text-2xl font-extrabold text-sec flex-1">
              Shopping Cart
            </h2>
            <h3 className="text-xl font-extrabold text-[#333]">
              {" "}
              {cartItems.length == 0 && (
                <>
                  <div className="alert_box">
                    <h2 className="empty"> Cart is Empty Now </h2>
                  </div>
                </>
              )}
            </h3>
          </div>
          <div>
            <table className="mt-6 w-full border-collapse divide-y">
              <thead className="whitespace-nowrap text-left">
                <tr>
                  <th className="text-base text-primary p-4">Description</th>
                  <th className="text-base text-primary p-4">Quantity</th>
                  <th className="text-base text-primary p-4">Price</th>
                </tr>
              </thead>
              <tbody className="whitespace-nowrap divide-y">
                {cartItems.length > 0 && (
                  <>
                    {cartItems.map((item) => (
                      <React.Fragment key={item._id}>
                        <tr>
                          <td className="py-6 px-4">
                            <div className="flex items-center gap-6 w-max">
                              <div className="h-36 shrink-0">
                                <img
                                  src={item.image}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div>
                                <p className="text-md font-bold text-[#333]">
                                  {item.name}
                                </p>
                                <button
                                  type="button"
                                  className="mt-4 font-semibold text-red-400 text-sm"
                                  onClick={() => removeItem(item._id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 px-4">
                            <div className="flex divide-x border w-max">
                              <button
                                type="button"
                                className="bg-gray-100 px-4 py-2 font-semibold"
                                onClick={() => decreaseQty(item._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 fill-current"
                                  viewBox="0 0 124 124"
                                >
                                  <path
                                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                                    data-original="#000000"
                                  />
                                </svg>
                              </button>

                              <button
                                type="button"
                                className="bg-transparent px-4 py-2 font-semibold text-[#333] text-md"
                              >
                                <h3>{item.qty}</h3>
                              </button>

                              <button
                                type="button"
                                className="bg-gray-800 text-white px-4 py-2 font-semibold"
                                onClick={() => increaseQty(item._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-3 fill-current"
                                  viewBox="0 0 42 42"
                                >
                                  <path
                                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                                    data-original="#000000"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="py-6 px-4">
                            <h4 className="text-md font-bold text-[#333]">
                              Rs. {item.price * item.qty}
                            </h4>
                          </td>
                        </tr>
                      </React.Fragment>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
          <button
            onClick={() => dispatch(clearCart())}
            className="p-3 bg-red-600 text-white text-md rounded-sm "
          >
            Clear All cart
          </button>
        </div>

        {/* order summary */}
        <div className="bg-gray-50 p-10">
          <h3 className="text-xl font-extrabold text-[#333] border-b pb-4">
            Order Summary
          </h3>
          <ul className="text-[#333] divide-y mt-6">
            <li className="flex flex-wrap gap-4 text-md py-4">
              Subtotal{" "}
              <span className="ml-auto font-bold">
                ${totalPrice().toLocaleString()}.00
              </span>
            </li>
            <li className="flex flex-wrap gap-4 text-md py-4">
              Shipping <span className="ml-auto font-bold">Free</span>
            </li>
            <li className="flex flex-wrap gap-4 text-md py-4">
              Tax <span className="ml-auto font-bold">Rs. 100</span>
            </li>
            <li className="flex flex-wrap gap-4 text-md py-4 font-bold">
              Total{" "}
              <span className="ml-auto">
              ${(totalPrice() + 100).toLocaleString()}.00
              </span>
            </li>
          </ul>
         
            <button
              type="button"  onClick={handlePayment}
              className="mt-6 text-md px-6 py-2.5 w-full bg-primary hover:bg-sec text-white rounded"
              target="_blank"
            >
              Check out
            </button>
         
        </div>
      </div>
    </>
  );
};

export default Cart;
