import React, {createContext, useState, useEffect} from "react";

// Create a context
export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  // States
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState({});

  // Fetch all products 
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await fetch("https://someapi.com/products");
  //     const data = await response.json();
  //     setProducts(data);
  //   };
  //   fetchProducts();
  // }, []);
  // console.log('context', searchResult)
  return <ProductContext.Provider value={{searchResult, setSearchResult}}>{children}</ProductContext.Provider>;
};

export default ProductProvider;