import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import Middle from "./Middle";

export default function Home() {
  const navigate = useNavigate();
   useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 text-slate-900 font-sans">
      <Header />
      <Middle />
    </div>
  );
}
