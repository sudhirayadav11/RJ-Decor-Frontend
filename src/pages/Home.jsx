import React from "react";
import Feature from "../components/Feature";
import Ads from "../components/Ads";
import Products from "./Products";
import BannerCarosel from "../components/BannerCarosel";

const Home = () => {
  return (
    <>
      <BannerCarosel />
      <Feature />
      <Products />

      <Ads />
    </>
  );
};

export default Home;
