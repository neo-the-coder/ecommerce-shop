import React, { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// import Context
import { ProductContext } from "../contexts/ProductContext";
// import Component
import ProductContainer from "../components/ProductContainer";

const Search = () => {
  const { searchResult, setSearchResult } = useContext(ProductContext);
  const [fetchParams] = useSearchParams();
  
  const query = fetchParams.get("q");
  const products = searchResult[query]?.products;

  console.warn(searchResult[query])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=0`
        );
        if (!response.ok) {
          alert(`Status ${response.status}. Error occured! Please try again.`);
        }
        const data = await response.json();
        setSearchResult({ ...searchResult, [query.toLocaleLowerCase()]: data });
      } catch (error) {
        alert(`${error.message}! Please try again.`);
      }
    };
    // Fetch data if it's missing
    if (!searchResult[query]) {
      fetchData();
    }
  },[query, searchResult, setSearchResult]);

  return (
    <div className="outline flex items-start">
      <section className="w-[350px]">
        Product Filters
      </section>
      <section className="w-full">
        <h1 className="mt-5 ml-5 mb-8 pb-2 border-b border-b-neutral text-xl text-black uppercase">{`${searchResult[query]?.total || 0} Result${searchResult[query]?.total > 1 ? 's' : ''} for `}<span className="normal-case">{`'${query}'`}</span></h1>
        <div className="ml-5">
          search result extra
        </div>
        <ProductContainer products={products}/>
      </section>
    </div>
  );
};

export default Search;
