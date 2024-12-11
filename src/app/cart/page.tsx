"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
} from "../redux/slices/cartSlice";
import Image from "next/image";

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, totalPrice, totalItems } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className="min-h-screen bg-slate-800 p-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <div>
          <table className="w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-blue-800">
                <th className="p-4">Image</th>
                <th className="p-4">Product</th>
                <th className="p-4">Price</th>
                <th className="p-4">Quantity</th>
                <th className="p-4">Total</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.product.id} className="border-b ">
                  <td className="p-4">
                    <Image
                      src={item.product.image}
                      alt={item.product.title}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </td>
                  <td className="p-4">{item.product.title}</td>
                  <td className="p-4">${item.product.price.toFixed(2)}</td>
                  <td className="p-4  space-x-2">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.product.id))
                      }
                      className="rounded-lg p-1 bg-white text-black font-bold"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.product.id))
                      }
                      className="rounded-lg p-1 bg-white text-black font-bold"
                    >
                      +
                    </button>
                  </td>
                  <td className="p-4">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        dispatch(removeItemFromCart(item.product.id))
                      }
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-end">
            <div className="w-1/3">
              <h2 className="text-xl font-bold">Summary</h2>
              <p className="mt-2">Total Items: {totalItems}</p>
              <p className="mt-2">Total Price: ${totalPrice.toFixed(2)}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
