"use client";

import { addItemToCart } from "@/app/redux/slices/cartSlice";
import { Product } from "@/app/redux/slices/productSlice";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import React from "react";
import { FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  

  const handleAddToCart = () => {
    dispatch(addItemToCart({ product: product, quantity: 1 }));
  };
  return (
    <div className="border border-gray-300 bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-square w-full relative">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, 
                 (max-width: 1200px) 50vw, 
                 33vw"
          priority
        />
      </div>

      <h2 className="text-lg font-semibold mt-2 text-black truncate">
        {product.title}
      </h2>

      <p className="flex items-center text-black mt-1">
        Price:
        <span className="text-red-500 ml-1 font-bold">${product.price}</span>
      </p>

      <p className="text-gray-800  text-sm line-clamp-2">
        {product.description}
      </p>

      {/* product rating  */}
      <div className="flex flex-row">
        {Array.from({ length: Math.floor(product.rating.rate) }, (_, index) => (
          <FaRegStar key={index} className="text-yellow-500" />
        ))}
        {Array.from(
          { length: 5 - Math.floor(product.rating.rate) },
          (_, index) => (
            <FaRegStar key={index + 5} className="text-gray-300" />
          )
        )}
      </div>
      <p className="text-sm text-black">
        ({product.rating.count}) people rated
      </p>
      <button
        className="mt-4 w-full px-4 py-2 bg-white text-black border-2 border-blue-600   rounded-md hover:bg-blue-600 hover:text-white hover:border-transparent transition-colors duration-300 "
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
      <button className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md border-2 border-transparent hover:bg-white  hover:text-black hover:border-blue-600 transition-colors duration-300 ">
        Buy Now
      </button>
    </div>
  );
};

export default Card;
