import React, { useEffect, useState } from "react";
// import Component
import Product from "./Product";
// import Icons
import { BiSolidGrid } from "react-icons/bi"
import { PiListBulletsBold } from "react-icons/pi";

const ProductContainer = ({ products }) => {
  // Sorting functions' object
  const sortBy = {
    featured: (a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0),
    category: (a, b) => a.category.localeCompare(b.category),
    "a-z": (a, b) => a.title.localeCompare(b.title),
    "z-a": (a, b) => b.title.localeCompare(a.title),
    "asc-price": (a, b) =>
      a.price -
      (a.price * a.discountPercentage) / 100 -
      (b.price - (b.price * b.discountPercentage) / 100),
    "des-price": (a, b) =>
      b.price -
      (b.price * b.discountPercentage) / 100 -
      (a.price - (a.price * a.discountPercentage) / 100),
    "asc-review": (a, b) => a.rating - b.rating,
    "des-review": (a, b) => b.rating - a.rating,
  };
  // Local state initialized from a local storage with "featured" fallback
  const [sortValue, setSortValue] = useState(
    localStorage.getItem("sortType") || "featured"
    );
    // Product view state
    const [isGrid, setIsGrid] = useState(true);
    // Product display count state
    const [displayCount, setDisplayCount] = useState(20);
    
    // Set sort value on selecting from a list
    const handleChange = (e) => {
      setSortValue(e.target.value);
  };

  // Uupdate displayCount
  useEffect(() => {
    function loadMore() {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      // If you reach the end of the Product Container
      // ADJUST LATER WITH FOOTER ON MIND
      if (scrollTop + clientHeight >= scrollHeight) {
        // If products are available and  not all are shown
        if (products && displayCount < products.length) {
          setDisplayCount((prevCount) => prevCount + 20);
        }
      }
    }
    document.addEventListener("scroll", loadMore);
    console.log("SCROL PRODUICSTESEF EFFECT IS RUNNING");
    return () => document.removeEventListener("scroll", loadMore);
  }, [displayCount, products]);

  // Save the selected sorting option to local storage when the component unmounts
  useEffect(() => {
    return () => {
      localStorage.setItem("sortType", sortValue);
    };
  }, [sortValue]);

  return (
    <section>
      <div className="p-3 ml-5 mb-8 border border-gray-300 rounded-md flex items-center">
        {/* View Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button className={`p-[2px] rounded-md border-gray-300 border ${isGrid ? 'text-accent border-accent' : 'text-primary'}`} title="Grid View" onClick={() => setIsGrid(true)}>
            {/* outline outline-accent */}
            <BiSolidGrid className="w-6 h-6" />
          </button>
          <button className={`p-[2px] rounded-md border-gray-300 border ${isGrid ? 'text-primary' : 'text-accent border-accent'}`} title="List View" onClick={() => setIsGrid(false)}>
            <PiListBulletsBold className="w-6 h-6" />
          </button>
        </div>
        {/* Sorting */}
        <div className="ml-auto">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortValue} onChange={handleChange}>
            <option value="featured">Featured Items</option>
            <option value="category">Category</option>
            <option value="a-z">A to Z</option>
            <option value="z-a">Z to A</option>
            <option value="asc-price">Price: Low to High</option>
            <option value="des-price">Price: High to Low</option>
            <option value="asc-review">Rating: High to Low</option>
            <option value="des-review">Rating: Low to High</option>
          </select>
        </div>
      </div>
      <ul className={`${isGrid ? 'product-grid' : 'block'}`}>
        {/* if products is available, sort them according to the sortValue */}
        {products && products.sort(sortBy[sortValue]).slice(0, displayCount).map((product) => {
          return <Product key={product.id} product={product} isGrid={isGrid} />;
        })}
      </ul>
    </section>
  );
};

export default ProductContainer;
