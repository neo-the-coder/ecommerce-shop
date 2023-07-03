import React, { useState } from "react";
import { Link } from "react-router-dom";
// import Icon
import { PiShoppingCartSimple, PiHeart } from "react-icons/pi";
import { ImSpinner2 } from "react-icons/im";

const LiveSearchResult = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
    id,
    brand,
    title,
    description,
    thumbnail,
    price,
    discountPercentage,
  } = product;

  const handleLoad = () => setIsLoading(false);

  return (
    <li className="my-4 pb-4 relative border-b-gray-300 border-b-[1px] hover:bg-gray-200">
      <Link to={`/product/${id}`}>
        {/* <div className={`${discountPercentage ? "block" : "hidden"} absolute top-0 right-2 py-1 px-2 bg-accent rounded-md text-[12px] text-white`}>Sale</div> */}
        <div className="flex justify-between gap-6">
          <div className="flex items-center justify-center w-2/5">
            {isLoading && (
              <ImSpinner2 className="w-[100px] h-[100px] p-0 animate-spin text-accent" />
            )}
            <img
              src={thumbnail}
              alt={description}
              className={`${
                isLoading ? "hidden" : "block"
              } w-full h-full max-h-[150px] object-cover rounded-md`}
              onLoad={handleLoad}
            />
          </div>
          <div className="w-full flex flex-col justify-around items-start my-1">
            {/* <p className="text-md text-neutral capitalize">
        {product.category}
      </p> */}
            <div>
              <p className="text-xl capitalize text-black">{brand}</p>
              <p className="text-md text-neutral capitalize">{title}</p>
              <div className="my-1">
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
            </div>
            <div className="flex items-center justify-center gap-2">
              <button
                title="Add to Cart"
                className="p-[6px] border border-solid border-gray-300 rounded-md text-black text-lg hover:bg-accent hover:text-white transition"
              >
                <PiShoppingCartSimple />
              </button>
              <button
                title="Add to Wishlist"
                className="p-[6px] border border-solid border-gray-300 rounded-md text-black text-lg hover:bg-accent hover:text-white transition"
              >
                <PiHeart />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default LiveSearchResult;
