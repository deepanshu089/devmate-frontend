import React from 'react'
import { useTheme } from '../context/ThemeContext'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { toggleTheme } = useTheme()
  const user = useSelector((store) => store.user);
 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //when logout button is clicked this function is called
  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
      dispatch(removeUser()); //remove user data from redux store
      navigate('/login'); //after logout redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 z-50">
      <div className="flex-1 px-4">
        <a className="btn btn-ghost text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          DevMate
        </a>
      </div>
      <div className="flex-none px-4 gap-4">
        {/* Home Link - Only show when user is logged in */}
        {user && (
          <Link to="/" className="btn btn-ghost btn-circle" aria-label="Home">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-all duration-300 hover:scale-110"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"
              />
            </svg>
          </Link>
        )}
        {user && (
          <Link to="/request" className="btn btn-ghost btn-circle" aria-label="Requests">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transition-all duration-300 hover:scale-110"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"
              />
            </svg>
          </Link>
        )}

        {/* User Menu */}
        {user && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary transition-all duration-300">
              <div className="w-10 rounded-full ring-2 ring-base-200">
                <img
                  alt="user avatar"
                  src={user.photoUrl}
                  className="object-cover"
                  onError={(e) => {
                    console.error('Error loading image:', e);
                    e.target.src = "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";
                  }}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-base-100 rounded-box w-64 border border-base-200 transform transition-all duration-300 ease-in-out">
              <li className="menu-title py-2">
                <span className="text-lg font-semibold">Welcome {user.fName}</span>
              </li>
              <li className="divider my-2"></li>
              <li>
                <Link to="/profile" className="flex items-center gap-3 hover:bg-primary/20 transition-colors duration-200 rounded-lg py-2">
                  <div className="p-2 rounded-full bg-primary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Profile</span>
                    <span className="text-xs text-base-content/70">View and edit your profile</span>
                  </div>
                  <span className="badge badge-primary ml-auto">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="flex items-center gap-3 hover:bg-info/20 transition-colors duration-200 rounded-lg py-2">
                  <div className="p-2 rounded-full bg-info/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-info" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Friends</span>
                    <span className="text-xs text-base-content/70">View your connections</span>
                  </div>
                </Link>
              </li>
              <li>
                <button
                  onClick={toggleTheme}
                  className="flex items-center gap-3 hover:bg-accent/20 transition-colors duration-200 rounded-lg py-2 w-full"
                >
                  <div className="p-2 rounded-full bg-accent/10 relative">
                    <div className="relative w-5 h-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-accent transition-all duration-300 rotate-0 scale-100 dark:-rotate-90 dark:scale-0 absolute inset-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-accent transition-all duration-300 rotate-90 scale-0 dark:rotate-0 dark:scale-100 absolute inset-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Theme</span>
                    <span className="text-xs text-base-content/70">Toggle light/dark mode</span>
                  </div>
                </button>
              </li>
              <li>
                <a className="flex items-center gap-3 hover:bg-secondary/20 transition-colors duration-200 rounded-lg py-2">
                  <div className="p-2 rounded-full bg-secondary/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-secondary" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Settings</span>
                    <span className="text-xs text-base-content/70">Manage your preferences</span>
                  </div>
                </a>
              </li>
              <li className="divider my-2"></li>
              <li>
                <a onClick={handleLogout} className="flex items-center gap-3 hover:bg-error/20 transition-colors duration-200 rounded-lg py-2">
                  <div className="p-2 rounded-full bg-error/10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-error" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Logout</span>
                    <span className="text-xs text-base-content/70">Sign out of your account</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
