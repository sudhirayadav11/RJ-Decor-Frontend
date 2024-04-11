import React from "react";

const About = () => {
  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-center my-6 text-2xl tracking-tight font-extrabold text-sec sm:text-3xl md:text-4xl">
          Nature inspired designs, Hand-crafted with love.
        </h2>
        <p className="text-center  px-12">
          {" "}
          Welcome to RJ Decor, your one-stop destination for exquisite furniture
          pieces that elevate your living spaces. Whether you're furnishing your
          home, office, or any other space, we have the perfect selection to
          meet your needs. From timeless classics to modern marvels, our
          collection boasts a wide range of designs crafted with precision and
          passion. Our commitment to quality ensures that each piece not only
          enhances the aesthetics of your space but also offers unparalleled
          comfort and functionality. Explore our curated catalog and discover
          furniture that reflects your style and personality. With RJ.Decorator,
          turning your vision into reality has never been easier.{" "}
        </p>
        
           

        
      </div>

      <div className="flex justify-between items-center px-8 py-12">
    <div className="w-1/2 pr-8">
        <p className="text-start my-4 text-3xl font-semibold capitalize">
            About the founder
        </p>
        <p className="text-justify">
            Lochan Yadav, a successful businessman who runs a furniture
            empire, is widely regarded as an innovator in the industry.
            
            His journey began in a little carpenter shop. Instead of using
            traditional procedures, Lochan infused a modern and creative
            touch into the company. Under his leadership, the small
            workshop blossomed into a thriving enterprise known for its
            exquisite and contemporary designs. Lochan's dedication to
            quality and craftsmanship became a trademark of his company. One
            of Lochan's notable achievements was introducing sustainable
            practices into the furniture manufacturing process. Concerned
            about environmental impact, he implemented eco-friendly
            materials and production methods, setting a trend in the
            industry. This not only gained him corporate responsibility
            admiration, but it also attracted an increasing number of
            environmentally concerned customers.
        </p>
    </div>
    <div className="w-1/2 pl-4">
        <img
            className="w-full"
            src="../../FB_IMG_1712640101191.jpg"
            alt="Image of Lochan Yadav"
        />
    </div>
</div>

    
    </>
  );
};

export default About;
