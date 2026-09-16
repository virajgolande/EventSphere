import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTicketAlt, FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
 
const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
 
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", scroll);
    return () => window.removeEventListener("scroll", scroll);
  }, []);
 
  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-pink-600" : "text-gray-600 hover:text-gray-900"
    }`;
 
  const mobileLinkClass = ({ isActive }) =>
    `text-base font-medium transition-colors duration-200 ${
      isActive ? "text-pink-600" : "text-gray-700 hover:text-gray-900"
    }`;
 
  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <nav
        className={`w-[92%] max-w-6xl bg-white/95 backdrop-blur-md rounded-full border border-black/5 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-black/5" : "shadow-md shadow-black/5"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 shrink-0">
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <FaTicketAlt className="text-white text-sm" />
            </span>
            <span className="text-lg font-semibold text-gray-900 tracking-tight">
              EventSphere
            </span>
          </NavLink>
 
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" className={linkClass}>Home</NavLink>
            <NavLink to="/events" className={linkClass}>Events</NavLink>
            {user && (
              <NavLink to="/my-tickets" className={linkClass}>My Tickets</NavLink>
            )}
            <NavLink to="/contact" className={linkClass}>Contact</NavLink>
          </div>
 
          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {user?.role === "admin" && (
              <NavLink
                to="/admin/add-event"
                className="text-sm font-medium text-gray-600 hover:text-gray-900 px-3 py-2 transition-colors"
              >
                + Create Event
              </NavLink>
            )}
 
            {!user ? (
              <NavLink
                to="/login"
                className="bg-gray-900 hover:bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
              >
                Login
              </NavLink>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink
                  to="/profile"
                  className="flex items-center gap-2 hover:bg-black/5 pl-1 pr-3 py-1 rounded-full transition-colors"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white text-xs font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-gray-900 max-w-[100px] truncate">
                    {user.name}
                  </span>
                </NavLink>
                <button
                  onClick={logout}
                  className="bg-gray-900 hover:bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
 
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-900 text-xl w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
 
      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden fixed top-[76px] left-1/2 -translate-x-1/2 w-[92%] max-w-6xl bg-white/95 backdrop-blur-md rounded-3xl border border-black/5 shadow-lg shadow-black/10 px-6 py-6 flex flex-col gap-5">
          <NavLink to="/" onClick={() => setOpen(false)} className={mobileLinkClass}>
            Home
          </NavLink>
          <NavLink to="/events" onClick={() => setOpen(false)} className={mobileLinkClass}>
            Events
          </NavLink>
          {user && (
            <NavLink to="/my-tickets" onClick={() => setOpen(false)} className={mobileLinkClass}>
              My Tickets
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)} className={mobileLinkClass}>
            Contact
          </NavLink>
 
          {user?.role === "admin" && (
            <NavLink
              to="/admin/add-event"
              onClick={() => setOpen(false)}
              className="bg-gray-900 text-white text-center py-3 rounded-full font-semibold"
            >
              + Create Event
            </NavLink>
          )}
 
          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="bg-gray-900 text-white text-center py-3 rounded-full font-semibold"
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 bg-black/[0.03] hover:bg-black/5 rounded-2xl p-4 transition-colors"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shrink-0">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-lg font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-gray-900 font-semibold">{user.name}</h3>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
              </NavLink>
 
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="bg-gray-900 text-white py-3 rounded-full font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};
 
export default Navbar;
 