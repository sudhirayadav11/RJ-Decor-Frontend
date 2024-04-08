import React from "react";
import Feature from "../components/Feature";
import Ads from "../components/Ads";
import BannerCarosel from "../components/BannerCarosel";
import ProductHome from "./ProductHome";

const Home = () => {
  return (
    <>
      <BannerCarosel />
      <Feature />
      <ProductHome/>
    

      <Ads />
    </>
  );
};

export default Home;
