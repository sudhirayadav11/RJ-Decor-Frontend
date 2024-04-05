import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});


API.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).user_token
    }`;
  }

  return req;
});

export const createWishlist = (wishData) =>
  API.post("/createwishlist", wishData);
export const getUserWishlist = () => API.get("/getwishlist");
export const deleteWishlist = (id) => API.delete(`wishlist/${id}`);
