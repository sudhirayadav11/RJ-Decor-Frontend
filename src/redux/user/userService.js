import axios from "axios";
const BACKEND_URL_REGISTER = "http://localhost:5000/api/v1/register";
const BACKEND_URL_LOGIN = "http://localhost:5000/api/v1/login";
const BACKEND_URL_LOGOUT='http://localhost:5000/api/v1/logout';


// register user
const register = async (userData) => {
  const response = await axios.post(BACKEND_URL_REGISTER, userData, {
    withCredentials: true,
  });
  return response.data;
};




// Login user
const login = async (userData) => {
  const response = await axios.post(BACKEND_URL_LOGIN, userData);
  return response.data;
};




// Logout user
const logout = async() =>{
  const response=await axios.get(BACKEND_URL_LOGOUT)
  return response.data.message
}



const authService = { register, login ,logout };
export default authService;
