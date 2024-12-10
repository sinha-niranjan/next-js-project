"use client";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import {
  increment,
  decrement,
  reset,
  incrementByAmount,
} from "./redux/slices/counterSlice";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className=" flex justify-center h-screen bg-slate-800 p-10">
      <div className=" text-lg text-white  uppercase ">
        Welcome to the ecommerce app{" "}
      </div>
      <div className="my-5">
        <h2 className="text-xl">Count: {count}</h2>
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
        >
          Increment
        </button>
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded-md mr-2"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          Increment by 5
        </button>{" "}
        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-purple-500 text-white rounded-md"
        >
         Reset
        </button>
      </div>
    </div>
  );
}
