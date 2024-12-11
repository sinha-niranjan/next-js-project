"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Image from "next/image";
import { addItemToCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../redux/slices/productSlice";
import { RootState } from "../redux/store";
import Link from "next/link";

interface OverlayProduct {
  product: Product;
  timestamp: number;
}

const OverlayProducts: OverlayProduct[] = [
  {
    product: {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
      rating: { rate: 3.9, count: 120 },
    },
    timestamp: 10,
  },
  {
    product: {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
      image:
        "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating: { rate: 4.1, count: 259 },
    },
    timestamp: 20,
  },
  {
    product: {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description:
        "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
      category: "men's clothing",
      image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
      rating: { rate: 4.7, count: 500 },
    },
    timestamp: 30,
  },
];

const InteractiveVideo = () => {
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [hydration, setHydration] = useState<boolean>(false);
  const [visibleProduct, setVisibleProduct] = useState<OverlayProduct | null>(
    null
  );
  const [lastProductId, setLastProductId] = useState<number | null>(null);
  const cart = useSelector((state: RootState) => state.cart);
  const products = useSelector((state: RootState) => state.products);

  useEffect(() => {
    setHydration(true);
  }, []);

  useEffect(() => {
    const productToShow = OverlayProducts.find(
      (product) =>
        currentTime >= product.timestamp && currentTime < product.timestamp + 1
    );
    if (productToShow && productToShow.product.id !== lastProductId) {
      setVisibleProduct(productToShow);
      setLastProductId(productToShow.product.id);
      const timer = setTimeout(() => {
        
        setVisibleProduct(null);
        setLastProductId(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentTime]);

  // Handle adding a product to the cart
  const handleAddToCart = (product: Product) => {
    dispatch(addItemToCart({ product: product, quantity: 1 }));
  };

  if (!hydration) {
    return (
      <div className="flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-800 flex flex-col items-center justify-center py-10">
      <h1 className="text-3xl font-bold mb-6"> Video Player</h1>

      <div className="relative w-full flex items-center justify-center  max-w-3xl">
        <ReactPlayer
          url="https://youtu.be/hxMNYkLN7tI?si=syvTxEaTUmCP5v-g"
          playing={true}
          controls={true}
          width="600px"
          height="500px"
          onProgress={({ playedSeconds }) => setCurrentTime(playedSeconds)}
        />

        {visibleProduct && (
          <div className="absolute top-10 left-25 max-w-lg bg-white p-4 rounded-md shadow-md border border-gray-300 flex items-center gap-4 animate-fade-in truncate ">
            <Image
              src={visibleProduct.product.image}
              alt={visibleProduct.product.title}
              width={50}
              height={50}
              className="rounded-md"
            />
            <div>
              <h2 className="text-lg font-bold text-black">
                {visibleProduct.product.title}
              </h2>
              <button
                onClick={() => handleAddToCart(visibleProduct.product)}
                className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <Link href={"/cart"}>
          <h2 className="text-2xl font-bold">🛒 Your Cart</h2>
        </Link>
        {cart.cartItems.length > 0 ? (
          <ul className="mt-4">
            {cart.cartItems.map((product) => (
              <li key={product.product.id} className="text-lg ">
                ✅ {product.product.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-gray-500">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default InteractiveVideo;
