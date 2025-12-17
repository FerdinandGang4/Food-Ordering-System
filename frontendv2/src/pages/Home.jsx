import React from "react";

import Header from "./Header";
import Middle from "./Middle";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      <Header />
      <Middle />
    </div>
  );
}
