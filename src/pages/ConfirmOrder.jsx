import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { toast } from "react-toastify";


const ConfirmOrder = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const { cartItems, shippingInfo } = useSelector((state) => ({
    ...state.cart,
  }));
  const sub_total = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );

  const shipping_charge = 200;
  const tax = 100;

  const grand_total = sub_total + shipping_charge + tax;

  let Address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.pincode}, ${shippingInfo.country}`;

  // payment integration
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
      console.log("Session created", session);

      const result = await stripe.redirectToCheckout({
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

  // cash on delivery 
    const CashOnDeliver = async () => {
      try {
        const orderData = {
          user: user._id,
          cartItems: cartItems.map(item => ({
            product: item._id,
            quantity: item.qty,
          })),
          shippingInfo,
          sub_total,
          shipping_charge,
          tax,
          grand_total,
        };
        console.log("Order data:", orderData);

        const response = await axios.post("http://localhost:5000/api/v1/checkout", orderData);
        console.log("Order placed successfully:", response.data);
        toast.success("Order placed successfully!");
       
        navigate("/");
      } catch (error) {
        console.error("Error placing order:", error);
        toast.error("Error placing order. Please try again.");
      }
    };
 

  return (
    <>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8">
          {/* Left Section (Shipping Details) */}
          <div className="">
            {/* shipping info */}
            <div className="border-blue-500 border mb-4">
              <div className="text-center mb-4">
                <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-700">
                  Shipping Info
                </h2>
              </div>

              <div className="space-y-1 px-4 py-4">
                <div className="flex justify-start items-center gap-2">
                  <h3 className="font-semibold">Email:</h3>
                  <p>{user.email}</p>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <h3 className="font-semibold">Phone : </h3>
                  <span>{shippingInfo.phone}</span>
                </div>
                <div className="flex justify-start items-center gap-2">
                  <h3 className="font-semibold">Address:</h3>
                  <p>{Address}</p>
                </div>
              </div>
            </div>
            {/* cart items */}
            <div className="border-blue-500 border ">
              <div className="my-2">
                <div className="text-center mb-4">
                  <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-700">
                    Your Cart Items
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border border-blue-500">
                          Image
                        </th>
                        <th className="px-4 py-2 border border-blue-500">
                          Product Name
                        </th>
                        <th className="px-4 py-2 border border-blue-500">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <tr key={item._id}>
                          <td className="px-4 py-2 ">
                            <img
                              src={item.image}
                              alt="Product"
                              className="w-16 h-16 rounded-full"
                            />
                          </td>
                          <td className="px-4 py-2">{item.name}</td>
                          <td className="px-4 py-2">
                            {item.qty} x Rs.{item.price} = Rs.{" "}
                            {item.qty * item.price}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section (Order Summary) */}
          <div className=" px-4  border-blue-500 border">
            <div className="text-center mb-4">
              <h2 className="text-xl font-semibold text-blue-700 border-b-2 border-blue-700">
                Order Summary
              </h2>
            </div>

            <div className="space-y-4 flex flex-col  ">
              <div className="flex justify-around   items-center">
                <strong>Subtotal : </strong>
                <h3>Rs.{sub_total}</h3>
              </div>
              <div className="flex justify-around   items-center">
                <strong>Shipping : </strong>
                <h3>Rs. {shipping_charge}</h3>
              </div>
              <div className="flex justify-around   items-center">
                <strong>Tax : </strong>
                <h3>Rs. {tax}</h3>
              </div>
              <div className="flex justify-around   items-center">
                <strong>Grand-Total : </strong>
                <h3>Rs. {grand_total}</h3>
              </div>
            </div>

            <div className="mt-8 flex justify-center flex-col items-center gap-4">
              <button
                className="w-[400px] py-3 px-4 bg-blue-900 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handlePayment}
              >
                Payment with card
              </button>
            </div>
            <div className="py-4 flex items-center justify-center ">
            <button className="w-[400px] text-center py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" onClick={CashOnDeliver}>
              Cash on delivery
            </button>
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
