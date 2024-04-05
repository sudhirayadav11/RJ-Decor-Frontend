import React from 'react'

const About = () => {
  return (
    <>
<div id="about" className="relative bg-white overflow-hidden mt-4">
  <div className="max-w-7xl mx-auto">
    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
      <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <polygon points="50,0 100,0 50,100 0,100" />
      </svg>
      <div className="pt-1" />
      <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
        <div className="sm:text-center lg:text-left">
        <h2 className="my-6 text-2xl tracking-tight font-extrabold text-sec sm:text-3xl md:text-4xl">
  We Provide Complete Furniture Product
</h2>
<p>
  Welcome to RJ.Decorator, your one-stop destination for exquisite furniture pieces that elevate your living spaces. Whether you're furnishing your home, office, or any other space, we have the perfect selection to meet your needs.
  From timeless classics to modern marvels, our collection boasts a wide range of designs crafted with precision and passion. Our commitment to quality ensures that each piece not only enhances the aesthetics of your space but also offers unparalleled comfort and functionality.
  Explore our curated catalog and discover furniture that reflects your style and personality. With RJ.Decorator, turning your vision into reality has never been easier.
</p>

        </div>
      </main>
    </div>
  </div>
  <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
    <img className="h-56 w-full object-cover object-top sm:h-72 md:h-96 lg:w-full lg:h-full" src="/images/products/product5.jpg" alt />
  </div>
</div>

    </>
  )
}

export default About
