import React, { useContext } from "react";
import { useSearchParams } from "react-router-dom";

// import Context
import { ProductContext } from "../contexts/ProductContext";
// import component
import Product from "../components/Product";

const Search = () => {
  const { searchResult } = useContext(ProductContext);
  const [fetchParams] = useSearchParams();
  const query = fetchParams.get("q");

  return (
    <div className="bg-blue-100">
      <h1>4 Results for query</h1>
      <ul>
        {searchResult[query]?.products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </ul>
    </div>
  );
};

export default Search;
