import React, { useState } from "react";
//import { ProductContext } from "../contexts/ProductContext";
import Product from "../components/Product";

const ProductsPage = ({ item }) => {
  const [input, setInput] = useState("");
 // const [searchedcategory, setSearchedcategory] = useState(null);
 // const { products } = useContext(ProductContext);
  // const filterProducts = products.filter((item) => {
  //   // return(
  //   //   item.category === "men's clothing" || item.category === "women's clothing" || item.category === "electronics" || item.category === 'jewelery'
  //   // );
  //   if (!searchedcategory) {
  //     return true;
  //   }
  //   return item.category === searchedcategory;
  // });

  // const handleSearch = (category) => {
  //   setSearchedcategory(category);
  // };

  return (
    <div>
      <section className="py-16 items-end">
        <h1 className="text-[26px] font-bold text-center underline">
          All Products
        </h1>
        <hr />
        <div className="items-center mb-4  space-x-4 align-middle">
          <label htmlFor="search" className="hidden">
            Search
          </label>
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="w-100 mt-2 py-3 px-3 rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none  "
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="md:w-32 bg-primary hover:bg-blue-dark text-white font-bold py-3 px-6 rounded-lg mt-3 hover:bg-orange-600 transition ease-in-out duration-300 justify-center"
          >
            Search
          </button>
        </div>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:max-0">
            {/* {filterProducts.map((product) => {
              return <Product product={product} key={product.id}></Product>;
            })} */}
            <Product/>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
