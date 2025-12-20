import { Link, useNavigate } from "react-router-dom";


function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-extrabold text-slate-800">MIU Food</div>
      </div>
      <nav className="flex items-center gap-4">
        <Link to="/login">
          <button className="text-slate-700 hover:underline link-pointer">
            Sign In
          </button>
        </Link>
        <button onClick={handleLogout} className="bg-purple-700 text-white px-4 py-2 rounded-md shadow-sm hover:brightness-95 link-pointer">
          Log out
        </button>
      </nav>
    </header>
  )
}

export default Header;