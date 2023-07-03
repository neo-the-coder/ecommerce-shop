import React from "react";

// import Icons
import {PiShoppingCartSimple, PiHeart} from 'react-icons/pi';

const Product = ({ product }) => {
  return (
    <li
      className="my-8 relative"
    >
      {/* <div className={`${product.discountPercentage ? "block" : "hidden"} absolute top-0 right-2 py-1 px-2 bg-accent rounded-md text-[12px] text-white`}>Sale</div> */}
      <div className="flex justify-between gap-6">
        <div className="flex items-center justify-between w-2/5">
          <img
            src={product.thumbnail}
            alt={product.description}
            className="w-full h-full max-h-[150px] object-cover rounded-md"
          />
        </div>
        <div className="w-full flex flex-col justify-around items-start my-1">
          {/* <p className="text-md text-neutral capitalize">
                      {product.category}
                    </p> */}
          <div>
            <p className="text-xl capitalize text-black">{product.brand}</p>
            <p className="text-md text-neutral capitalize">{product.title}</p>
            <div className="my-1">
              <span>
                ${" "}
                {(
                  (product.price / 100) *
                  (100 - product.discountPercentage)
                ).toFixed(2)}
              </span>
              <span className="ml-2 line-through text-neutral">
                $ {product.price.toFixed(2)}
              </span>
              <span className="ml-2  text-dullRed">
                -{product.discountPercentage.toFixed(2)}%
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
    </li>
  );
};

export default Product;
