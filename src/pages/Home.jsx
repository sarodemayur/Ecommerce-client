/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import Product from "../components/Product";
import Hero from "../components/Hero";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Authcontext";
const Home = () => {
 const navigate = useNavigate();
 const {products} = useAuth();
  const [selectedCategory, SetSelectedCategory] = useState(null);

  const filterProducts = products.filter((item) => {
    // return(
    //   item.category === "men's clothing" || item.category === "women's clothing" || item.category === "electronics" || item.category === 'jewelery'
    // );
    if (!selectedCategory) {
      return true;
    }
    return item.category === selectedCategory;
  });

  const handleCategoryClick = (category) => {
    SetSelectedCategory(category);
  };

  const handleNavigate = () => {
    navigate("/productspage");
  };

  return (
    <div>
      <Hero />
      <section className="py-16 items-center">
        <h1 className="text-[26px] font-bold text-center underline">
          {selectedCategory}
        </h1>
        <hr />
        <div className="flex-auto flex space-x-4 mb-4 mt-4  items-center justify-evenly">
          <hr className="font-bold" />
          <button
            onClick={() => handleCategoryClick("men's clothing")}
            className="h-10 px-6 font-semibold rounded-md bg-black text-white items-center justify-center"
          >
            Men's Clothing
          </button>
          <button
            onClick={() => handleCategoryClick("women's clothing")}
            className="h-10 px-6 font-semibold rounded-md bg-black text-white items-center justify-center"
          >
            Women's Clothing
          </button>
          <button
            onClick={() => handleCategoryClick("electronics")}
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
          >
            electronics
          </button>
          <button
            onClick={() => handleCategoryClick("jewelery")}
            className="h-10 px-6 font-semibold rounded-md bg-black text-white"
          >
            jewelry
          </button>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:max-0">
            {/* {filterProducts.map((product) => {
              return <Product product={product} />
            })} */}
            <Product/>
          </div>
        </div>
        <div
         onClick={handleNavigate}
          className="text-[20px] text-center underline font-medium cursor-pointer"
        >
          Explore products
        </div>
      </section>
    </div>
  );
};

export default Home;
