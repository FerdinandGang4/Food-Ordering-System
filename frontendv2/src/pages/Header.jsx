import { Link } from "react-router-dom";


function Header() {
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
        <Link to={"/register"}><button className="bg-sky-700 text-white px-4 py-2 rounded-md shadow-sm hover:brightness-95 link-pointer">
          Sign Up
        </button></Link>
      </nav>
    </header>
  )
}

export default Header;