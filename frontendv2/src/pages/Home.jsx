import React from "react";

import Header from "./Header";
import Middle from "./Middle";
import { CartProvider } from "../components/CartContext";

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
        <Header />
        <Middle />
      </div>
    </CartProvider>
  );
}
