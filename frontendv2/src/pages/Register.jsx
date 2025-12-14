import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-red-500 mb-6">
          Create an Account
        </h2>

        {/* Register Form */}
        <form className="space-y-4">
          
          {/* Name */}
          <div>
            <label className="text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium">Email</label>
            <input
              type="email"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium">Password</label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
              placeholder="Enter a password"
            />
          </div>

          {/* Role selection */}
          <div>
            <label className="text-gray-700 font-medium">Select Role</label>
            <select
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400 outline-none"
            >
              <option value="customer">Customer</option>
              <option value="owner">Restaurant Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
