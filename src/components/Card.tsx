"use client";

import { Product } from "@/app/redux/slices/productSlice";
import Image from "next/image";
import React from "react";

const Card = ({ product }: { product: Product }) => {
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

      <p className="text-gray-800 truncate">{product.description}</p>

      <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300">
        Buy Now
      </button>
    </div>
  );
};

export default Card;
