import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import Components
import Breadcrumbs from "../components/Breadcrumbs";
// import Icons
import {PiCaretUpBold, PiCaretDownBold} from "react-icons/pi";

const ProductDetails = () => {
  const {state} = useLocation();
  const product = state ? state.product : undefined;
  // const product = {images: [], thumbnail: ''}
  // console.warn(product);

  // Local States
  const [quantity, setQuantity] = useState(1);
  const [errorMessage, setErrorMessage] = useState(null);
  console.info('RENDERED', quantity, errorMessage)

  // Button handlers
  const validateQuantity = (quantity, variable = 0) => {
    let isValid = false;
    if (quantity + (variable) > product.stock) {
      setErrorMessage(
        `Stock has only ${product.stock} item${product.stock > 1 ? "s" : ""}.`
      );
    } else if (quantity + (variable) < 1) {
      setErrorMessage("Please enter at least 1 quantity");
    } else {
      setErrorMessage(null);
      isValid = true;
    }
    return isValid;
  };

  const increment = () =>
    setQuantity((prevQuantity) =>
      validateQuantity(prevQuantity, 1) ? prevQuantity + 1 : prevQuantity
    );

  const decrement = () =>
    setQuantity((prevQuantity) =>
      validateQuantity(prevQuantity, -1) ? prevQuantity - 1 : prevQuantity
    );

  // Quantity field handlers
  const handleChange = (e) => {
    if (/^\d+$/.test(e.target.value)) {
      setQuantity(Number(e.target.value));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
    }
    if (e.key === "ArrowUp") increment();
    else if (e.key === "ArrowDown") decrement();
  };
  // Form Handler
  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <section className="flex items-start">
      <aside className="w-[350px]">Product Ads</aside>
      <main className="w-full">
        <Breadcrumbs />
        {product ? (
          <div className="ml-5 flex items-start justify-between gap-[30px]">
            <div className="w-1/2">
              <div className="min-h-[500px] max-h-[600px] flex items-center rounded-md border border-gray-300 bg-gray-100">
                <img src={product.thumbnail} alt="" className="block w-full h-full object-contain rounded-md" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                {product.images.toReversed().map((image, index) => (
                  <div key={index} className="w-[100px] h-[100px] flex items-center rounded-md border border-gray-300 bg-gray-100 transition-colors hover:border-accent cursor-pointer">
                    <img src={image} alt="" className="block w-full h-full object-contain rounded-md" />
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/2">
              {/* Title */}
              <h1 className="capitalize text-primary text-2xl mb-1">{product.title}</h1>
              {/* Category */}
              <Link to={`/${product.category}`} className="inline-block my-6 capitalize text-xl text-neutral hover:underline">{product.category.replaceAll("-", " ")}</Link>
              {/* Price container */}
              <div className="mt-3 mb-6">
                <span className="text-dullRed text-xl">
                  -{product.discountPercentage.toFixed(2)}%
                </span>
                <span className="ml-2 text-2xl font-semibold">
                  ${((product.price / 100) * (100 - product.discountPercentage)).toFixed(2)}
                </span>
                <span className="block text-neutral text-md">
                  List Price: <span className="line-through">${product.price.toFixed(2)}</span>
                </span>
              </div>
              {/* Quantity */}
              <form onSubmit={handleSubmit} autoComplete="off">
                <label htmlFor="quantity" className="block text-md mb-2">Quantity:</label>
                <div className="flex items-center gap-1">
                  <button onClick={decrement} className="flex items-center justify-center p-2 rounded-md border border-gray-300">
                    <PiCaretDownBold className="w-4 h-4" />
                  </button>
                  <input onKeyDown={handleKeyPress} onFocus={(e) => e.target.select()} type="text" className="w-[50px] px-2 py-1 rounded-md border border-gray-300" name="quantity" id="quantity" value={quantity} onChange={handleChange} />
                  <button onClick={increment} className="flex items-center justify-center p-2 rounded-md border border-gray-300">
                    <PiCaretUpBold className="w-4 h-4" />
                  </button>
                </div>
              </form>
              {errorMessage && <p className="text-md text-red-500"><span className="mr-1">❌</span>{errorMessage}</p>}
              {product.stock}
            </div>
          </div>
        ) : (
          <p className="ml-5">No product</p>
        )}
      </main>
    </section>
  );
};

export default ProductDetails;
