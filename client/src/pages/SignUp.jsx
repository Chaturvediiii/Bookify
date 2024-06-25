import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-sm"
          id="username"
        />
        <input
          type="text"
          placeholder="email"
          className="border p-3 rounded-sm"
          id="email"
        />
        <input
          type="text"
          placeholder="password"
          className="border p-3 rounded-sm"
          id="password"
        />
        <button className="bg-blue-950 text-cream p-3 rounded-sm hover:opacity-95 disabled:opacity-80 uppercase">
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
    </div>
  );
}
