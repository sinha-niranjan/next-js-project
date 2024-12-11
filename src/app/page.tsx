"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@/components/Card";
import { AppDispatch, RootState } from "./redux/store";

import { fetchProduct } from "./redux/slices/productSlice";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);

  if (loading) return <p>Loading .... </p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="min-h-screen bg-slate-800 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5   gap-10 p-10">
        {products.map((product) => {
          return (
            <div className=" " key={product.id}>
              <Card product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
