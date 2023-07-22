import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

// import Icons
import { PiShoppingCartSimple, PiHeart } from "react-icons/pi";
// import Router
import { Link } from "react-router-dom";

const Product = ({ product, isGrid }) => {
  // Local State
  const [isLoading, setIsLoading] = useState(true);
  // Handle spinner state
  const handleLoad = () => setIsLoading(false);

  const {
    category,
    rating,
    stock,
    title,
    description,
    thumbnail,
    price,
    discountPercentage,
  } = product;

  return (
    <li
      className={`relative pl-5 ${
        isGrid ? "w-1/4 flex-none h-[450px]" : "my-8"
      }`}
    >
      {/* <div className={`${product.discountPercentage ? "block" : "hidden"} absolute top-0 right-2 py-1 px-2 bg-accent rounded-md text-[12px] text-white`}>Sale</div> */}
      <div
        className={`flex justify-between h-full ${
          isGrid
            ? "flex-col gap-4 p-5 rounded-md border border-gray-300"
            : "flex-row gap-6"
        }`}
      >
        {/* Product image container */}
        <div
          className={`flex items-center justify-center flex-shrink-0 rounded-md ${
            isGrid
              ? "w-full h-[200px]"
              : "w-[300px] h-[300px] p-5 rounded-md border border-gray-300"
          }`}
        >
          {/* Spinner while loading image */}
          {isLoading && (
            <ImSpinner2 className="w-[100px] h-[100px] p-0 animate-spin text-accent" />
          )}
          {/* Product image */}
          <Link
            to={`/${category}/${title}`}
            className={`flex-grow h-full rounded-md bg-gray-100 ${
              isLoading ? "hidden" : "block"
            }`}
          >
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-contain rounded-md"
              onLoad={handleLoad}
            />
          </Link>
        </div>
        {/* Product Info container */}
        <div
          className={`w-full flex flex-col justify-between items-start flex-grow gap-2 rounded-md`}
        >
          {/* Product Info Wrapper */}
          <div
            className={`flex-grow flex flex-col justify-between ${
              isGrid ? "items-start" : "items-start"
            }`}
          >
            {/* Title */}
            <Link
              to={`/${category}/${title}`}
              className={`capitalize text-black mb-1 hover:underline ${
                isGrid ? "text-lg" : "text-xl"
              }`}
              title={title}
            >
              {isGrid
                ? title.slice(0, 20) + (title.length > 20 ? "..." : "")
                : title}
            </Link>
            {/* Description (List View Only) */}
            {!isGrid && (
              <p
                className="text-md text-neutral capitalize mb-2"
              >
                {description}
              </p>
            )}
            {/* Product rating */}
            <div
              className="flex items-center justify-start gap-2"
              title={`${rating} out of 5`}
            >
              <div className="w-[80px] flex-none overflow-hidden">
                <div
                  style={{ width: `${rating * 16}px` }}
                  className="rating-star"
                  // onClick={(e) => console.log(parseInt(getComputedStyle(e.target).getPropertyValue('background-size'),10))}
                ></div>
              </div>
              <span className="text-neutral text-[13px] leading-[18px]">
                ({Math.floor(price / rating)})
              </span>
            </div>
            {/* Price container */}
            <div className="mt-3 mb-1">
              <span className="text-xl block font-semibold">
                ${((price / 100) * (100 - discountPercentage)).toFixed(2)}
              </span>
              <span className="line-through text-neutral text-sm">
                ${price.toFixed(2)}
              </span>
              <span className="ml-2 text-dullRed text-sm">
                -{discountPercentage.toFixed(2)}%
              </span>
            </div>
            {/* Stock info */}
            <div className="mt-auto">
              {stock <= 10 && (
                <span className="text-sm px-1.5 text-dullRed font-medium border border-dullRed rounded-md">Only {stock} left!
                </span>
              )}
              {/* Category info (List View Only) */}
              <Link to={`/${category}`} className={`block text-md text-neutral capitalize mt-0.5 hover:underline ${
                  isGrid && "hidden"
                }`}>{category.replaceAll("-", " ")}</Link>
            </div>
          </div>
          {/* Button container */}
          <div className="flex items-center justify-center gap-2">
            <button
              title="Add to Cart"
              className="p-2.5 border border-solid border-gray-300 rounded-md text-black text-lg hover:bg-accent hover:text-white transition"
            >
              <PiShoppingCartSimple className="w-6 h-6" />
            </button>
            <button
              title="Add to Wishlist"
              className="p-2.5 border border-solid border-gray-300 rounded-md text-black text-lg hover:bg-accent hover:text-white transition"
            >
              <PiHeart className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default Product;
