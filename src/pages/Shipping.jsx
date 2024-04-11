import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../redux/cart/cartSlice";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => ({ ...state.cart }));
  console.log("shipping info", shippingInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [shippingDetails, setShippingDetails] = useState({
    city: shippingInfo.city ? shippingInfo.city : "",
    address: shippingInfo.address ? shippingInfo.address : "",
    pincode: shippingInfo.pincode ? shippingInfo.pincode : "",
    phone: shippingInfo.phone ? shippingInfo.phone : "",
    country: shippingInfo.country ? shippingInfo.country : "",
  });
  const { city, address, pincode, phone, country } = shippingDetails;
  const onShippingInfoChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  const handleShippingInfo = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo(shippingDetails));
    if (shippingInfo) {
      navigate("/order/confirm");
    }
  };
  return (
    <>
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 ">
        <div className="max-w-md mx-auto border border-blue-400 rounded-xl px-8">
          <div>
            <h2 className="text-3xl font-semibold text-blue-700 text-center border-b-2 border-blue-400">
              Shipping Details
            </h2>
          </div>
          <form className="mt-6 space-y-2 py-4" onSubmit={handleShippingInfo}>
          <div>
              <label
                htmlFor="address"
                className="block text-md font-medium text-gray-700"
              >
                Address :
              </label>
              <input
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={onShippingInfoChange}
                placeholder="Enter address"
                className="mt-1  block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="city"
                className="block text-md font-medium text-gray-700"
              >
                City :
              </label>
              <input
                id="city"
                type="text"
                name="city"
                value={city}
                onChange={onShippingInfoChange}
                placeholder="Enter city"
                className="mt-1  block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between items-center gap-4">
            <div>
              <label
                htmlFor="pincode"
                className="block text-md font-medium text-gray-700"
              >
                Pincode :
              </label>
              <input
                id="pincode"
                type="number"
                name="pincode"
                value={pincode}
                onChange={onShippingInfoChange}
                placeholder="Enter pincode"
                className="mt-1  block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="country"
                className="block text-md font-medium text-gray-700"
              >
                Country :
              </label>
              <input
                id="country"
                type="text"
                name="country"
                value={country}
                onChange={onShippingInfoChange}
                placeholder="Enter country"
                className="mt-1  block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
            </div>
            
            <div>
              <label
                htmlFor="phone"
                className="block text-md font-medium text-gray-700"
              >
                Phone Number :
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={phone}
                onChange={onShippingInfoChange}
                placeholder="Enter phone number"
                className="mt-1  block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3 my-4 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Please Proceed
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;

