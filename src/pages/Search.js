import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";

// import Context
import { ProductContext } from "../contexts/ProductContext";
// import Component
import Product from "../components/Product";
// import Icons
import { PiListBulletsBold } from "react-icons/pi";
import { MdGridOn } from "react-icons/md";
import ProductContainer from "../components/ProductContainer";

const Search = () => {
  const { searchResult } = useContext(ProductContext);
  const [fetchParams] = useSearchParams();

  const query = fetchParams.get("q");
  const products = searchResult[query]?.products;
  console.warn(searchResult[query])

  return (
    <div className="outline flex items-start">
      <section className="w-[350px]">
        Category
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
