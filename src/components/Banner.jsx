import React from 'react';

const Banner = () => {
  return (
    <>
    <div className="bg-cover bg-no-repeat bg-center py-20 md:py-28" style={{backgroundImage: 'url("/images/banner-bg.jpg")'}}>
      <div className="container mx-auto px-4 md:px-0  ">
    
      <h1 className="text-4xl md:text-6xl text-gray-800 font-medium mb-4 capitalize">
          Best collection for  <br /> Daily Life
        </h1>
        <p className="text-sm md:text-md lg:text-lg text-gray-700 mb-6 md:mb-12 ">
          Discover the latest trends and essentials for your everyday life. Explore our wide range of products carefully curated to meet your needs and preferences. From fashion to home decor, we have everything you need to elevate your daily routines.
        </p>

        <div className="mt-6 md:mt-12">
          <a href="#" className="bg-primary border border-primary text-white px-6 md:px-8 py-3 md:py-4 font-medium rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
       
      </div>
      
      </div>
    </div>

    <div className="bg-cover bg-no-repeat bg-center py-20 md:py-28" style={{backgroundImage: 'url("/images/category/category-3.jpg")'}}>
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-4xl md:text-6xl text-gray-900 font-medium mb-4 capitalize">
        Elevate Your Home Decor with <br /> Our Exquisite Collection
        </h1>
        <p className="text-sm md:text-md lg:text-lg text-gray-700 mb-6 md:mb-12">
          Discover the latest trends and essentials for your everyday life. Explore our wide range of products carefully curated to meet your needs and preferences. From fashion to home decor, we have everything you need to elevate your daily routines.
        </p>

        <div className="mt-6 md:mt-12">
          <a href="#" className="bg-primary border border-primary text-white px-6 md:px-8 py-3 md:py-4 font-medium rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
        </div>
      </div>
    </div>

    <div className="bg-cover bg-no-repeat bg-center py-20 md:py-28" style={{backgroundImage: 'url("/images/category/category-6.jpg")'}}>
      <div className="container mx-auto px-4 md:px-0">
        <h1 className="text-4xl md:text-6xl text-gray-900 font-medium mb-4 capitalize">
          Best collection for  <br /> Daily Life
        </h1>
        <p className="text-sm md:text-md lg:text-lg text-gray-700 mb-6 md:mb-12">
          Discover the latest trends and essentials for your everyday life. Explore our wide range of products carefully curated to meet your needs and preferences. From fashion to home decor, we have everything you need to elevate your daily routines.
        </p>

        <div className="mt-6 md:mt-12">
          <a href="#" className="bg-primary border border-primary text-white px-6 md:px-8 py-3 md:py-4 font-medium rounded-md hover:bg-transparent hover:text-primary">Shop Now</a>
        </div>
      </div>
    </div>
    </>
  );
};

export default Banner;
