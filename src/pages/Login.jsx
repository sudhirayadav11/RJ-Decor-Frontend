import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RESET_AUTH, login } from "../redux/user/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, isLoading, isSuccess } = useSelector(
    (state) => state.user
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    const userData = { email, password };
    await dispatch(login(userData));
    console.log(formData);
  };
  useEffect(() => {
    if (isSuccess && isLoggedIn) {
      navigate("/");
    }
   
    dispatch(RESET_AUTH());
    window.scrollTo(0, 0);
  }, [isSuccess, isLoggedIn, dispatch, navigate]);


  

  return (
    <>
      {isLoading && <p className="text-red-500">Loading..</p>}

      <section className="h-[500px] overflow-y-hidden overflow-hidden  flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
        <div className="md:w-1/3 max-w-sm">
          <img
            src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740"
            alt="Sample image "
          />
        </div>
        <div className="md:w-1/3 max-w-sm    ">
          <div className="text-center md:text-left">
            <label className="mr-1">Sign in with</label>
            <button
              type="button"
              className="mx-1 h-9 w-9  rounded-full bg-primary hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <BiLogoFacebook
                size={20}
                className="flex justify-center items-center w-full"
              />
            </button>
            <button
              type="button"
              className="inlne-block mx-1 h-9 w-9 rounded-full bg-primary hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
            >
              <AiOutlineGoogle
                size={20}
                className="flex justify-center items-center w-full"
              />
            </button>
          </div>
          <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
              Or
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <input
              className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded"
              type="text"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email Address"
            />
            <input
              className="text-sm w-full px-4 py-3 border border-solid border-gray-300 rounded mt-8"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
            />
            <div className="mt-4 flex justify-between font-semibold text-sm">
              <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                <input className="mr-1" type="checkbox" />
                <span>Remember Me</span>
              </label>
              <Link
                className="text-primary hover:text-blue-700 hover:underline hover:underline-offset-4"
                to="/login"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="text-center md:text-left">
              <button
                className="mt-4 bg-primary hover:bg-blue-700 w-full py-2 text-white uppercase rounded text-xs tracking-wider"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
          <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
            Don&apos;t have an account?{" "}
            <Link
              className="text-red-600 hover:underline hover:underline-offset-4"
              to="/register"
            >
              Register Here
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
