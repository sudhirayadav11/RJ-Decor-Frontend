import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export const getProducts = () => API.get("/products");
export const getProductById = (id) => API.get(`products/${id}`);
export const getSearchProduct = (searchQuery) =>
  API.get(`product/search?searchQuery=${searchQuery}`);
