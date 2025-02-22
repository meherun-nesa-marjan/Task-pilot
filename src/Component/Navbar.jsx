import React, { useContext } from 'react';
import { IoAddCircle, IoHomeOutline } from 'react-icons/io5';
import { MdDensitySmall } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { UseTheme } from '../Hooks/UseTheme';
import { IoSunny, IoMoon } from "react-icons/io5";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const { changeTheme, mode } = UseTheme();
  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="w-11/12 mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><a>Item 1</a></li>

              <li><a>Item 3</a></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">TaskPilot</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
          <li><Link to="/home"><IoHomeOutline /> Home</Link></li>
          <li><Link to="/home/add-task"><IoAddCircle /> Add Task</Link></li>
            <li><Link><MdDensitySmall />All Task </Link></li>



          </ul>
        </div>
        <div className="navbar-end">
          <button onClick={changeTheme} aria-label="Toggle Theme" className="btn btn-ghost">
            {mode === "light" ? <IoSunny /> : <IoMoon />}
          </button>
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="dropdown dropdown-bottom">
                <div tabIndex={0}>
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                </div>
               
              </div>
              <Tooltip id="user-tooltip" className="bg-gray-700 text-white p-2 rounded" />
              <button onClick={handleSignOut} className="btn bg-[#137257] text-white">Logout</button>
            </div>
          ) : (
            <div className="flex space-x-3 items-center">
              <Link to="/SignIn">Sign In</Link>
              <span>|</span>
              <Link to="/SignUp">Register</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;