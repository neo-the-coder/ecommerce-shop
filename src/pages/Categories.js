import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import Component
import ProductContainer from "../components/ProductContainer";
//  import Data
import { categories } from "../data/categories";

const Categories = () => {
  // Local state
  const [products, setProducts] = useState([]);
  // Get category type from query parameter
  const {type} = useParams();

  const category = type.startsWith("women")
    ? categories["women"][type]
    : type.startsWith("men")
    ? categories["men"][type]
    : categories[type];

  // Fetch products of category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/category/${type}`
        );
        if (!response.ok) {
          alert(`Status ${response.status}. Error occured! Please try again.`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        alert(`${error.message}! Please try again.`);
      }
    };
    fetchData();
  },[type]);

  return (
    <div className="outline flex items-start">
      <section className="w-[350px]">
        Product Filters
      </section>
      <section className="w-full">
        <h1 className="mt-5 ml-5 mb-8 pb-2 border-b border-b-neutral text-xl text-black uppercase">{type}</h1>
        <div className="overflow-hidden ml-5 my-8 p-4 rounded-md border border-gray-300">
          <img src={category.image} alt="" className="mr-5 block max-h-[200px] rounded-md float-left"/>
          <p className="text-justify">{category.description}</p>
        </div>
        <ProductContainer products={products.products}/>
      </section>
    </div>
  );
};

export default Categories;
