import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <header className="bg-blue-950 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-2">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap text-cream">
            <span>Book</span>
            <span>ify</span>
          </h1>
        </Link>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-cream">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-cream">About</li>
          </Link>
          <Link to="/books">
            <li className="hidden sm:inline text-cream">Books</li>
          </Link>
          <Link to="/contact">
            <li className="hidden sm:inline text-cream">Contact Us</li>
          </Link>
          <Link to="/profile">
          {currentUser ? (
            <img src={currentUser.avatar} alt="profile" className="rounded-full w-7 h-7 object-cover"/>
          ) :
          <li className=" text-cream">Sign In</li>
          }
            
          </Link>
        </ul>
      </div>
    </header>
  );
}
