import React, { useState } from "react";
import { ImSpinner2 } from "react-icons/im";

// import Icons
import { PiShoppingCartSimple, PiHeart } from "react-icons/pi";
// import Router
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  // Local State
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => setIsLoading(false);

  const {
    id,
    category,
    brand,
    rating,
    stock,
    title,
    description,
    thumbnail,
    price,
    discountPercentage,
  } = product;

  return (
    <li className="my-8 relative">
      {/* <div className={`${product.discountPercentage ? "block" : "hidden"} absolute top-0 right-2 py-1 px-2 bg-accent rounded-md text-[12px] text-white`}>Sale</div> */}
      <div className="flex justify-between gap-6">
        <div className="flex items-center justify-center w-[300px] flex-shrink-0 p-5 border border-gray-300 rounded-md">
          {isLoading && (
            <ImSpinner2 className="w-[100px] h-[100px] p-0 animate-spin text-accent" />
          )}
          <Link to={`/product/${id}`} className="h-full">
            <img
              src={thumbnail}
              alt={title}
              className={`${
                isLoading ? "hidden" : "block"
              } w-full h-full object-cover max-h-[400px] rounded-md`}
              onLoad={handleLoad}
            />
          </Link>
        </div>
        <div className="flex flex-col justify-between items-start flex-grow gap-2 rounded-md hover:bg-gray-100">
          <div className="flex-grow flex flex-col items-start justify-between">
            <Link
              to={`/product/${id}`}
              className="text-xl capitalize text-black mb-1 hover:underline"
            >
              {brand}
            </Link>
            <p className="text-md text-neutral capitalize mb-3">
              {description}
            </p>
            {/* <div className="w-[120px]">
                <div style={{width: `${rating/5*100}%`}} className="bg-accent flex items-center">
                  <span className="bg-white mix-blend-luminosity block w-6 flex-none text-2xl text-neutral star-outline">★</span>
                  <span className="bg-white mix-blend-luminosity block w-6 flex-none text-2xl text-neutral star-outline">★</span>
                  <span className="bg-white mix-blend-luminosity block w-6 flex-none text-2xl text-neutral star-outline">★</span>
                  <span className="bg-white mix-blend-luminosity block w-6 flex-none text-2xl text-neutral star-outline">★</span>
                  <span className="bg-white mix-blend-luminosity block w-6 flex-none text-2xl text-neutral star-outline">★</span>
                </div>
              </div> */}

            {/* Price container */}
            <div className="my-2">
              <span>
                $ {((price / 100) * (100 - discountPercentage)).toFixed(2)}
              </span>
              <span className="ml-2 line-through text-neutral">
                $ {price.toFixed(2)}
              </span>
              <span className="ml-2  text-dullRed">
                -{discountPercentage.toFixed(2)}%
              </span>
            </div>
            {/* Product rating */}
            <div className="flex items-center justify-start gap-2 mb-3">
              <div className="w-[120px] flex-none overflow-hidden">
                <div
                  style={{ width: `${rating * 24}px` }}
                  className="rating-star"
                ></div>
              </div>
              <span className="text-neutral text-sm">
                ({Math.floor(price / rating)})
              </span>
            </div>
            {/* Stock info */}
            <div className="mt-auto">
              {stock < 20 && (
                <p className="text-md text-dullRed font-medium">
                  Only {stock} left
                </p>
              )}
              <p className="text-md text-neutral capitalize">{category}</p>
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
