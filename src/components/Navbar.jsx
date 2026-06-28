import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTicketAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 30);

    window.addEventListener("scroll", scroll);

    return () =>
      window.removeEventListener("scroll", scroll);
  }, []);

  const linkClass = ({ isActive }) =>
    `transition duration-300 font-medium ${
      isActive
        ? "text-pink-500"
        : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10"
          : "bg-black/40 backdrop-blur-lg"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}

        <NavLink
          to="/"
          className="flex items-center gap-3"
        >
          <FaTicketAlt className="text-pink-500 text-2xl" />

          <h1 className="text-2xl font-bold text-white">
            EventSphere
          </h1>
        </NavLink>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-8">

          <NavLink
            to="/"
            className={linkClass}
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            className={linkClass}
          >
            Events
          </NavLink>

          {user && (
            <NavLink
              to="/my-tickets"
              className={linkClass}
            >
              My Tickets
            </NavLink>
          )}

          <NavLink
            to="/contact"
            className={linkClass}
          >
            Contact
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/admin/add-event"
              className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-full text-white transition"
            >
              + Create Event
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-full text-white font-semibold transition shadow-lg shadow-pink-600/30"
            >
              Login
            </NavLink>
          ) : (
            <div className="flex items-center gap-4">

              {/* Profile */}

              <NavLink
                to="/profile"
                className="flex items-center gap-3 hover:bg-white/10 px-3 py-2 rounded-xl transition-all duration-300"
              >

                <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600 to-purple-700 border-2 border-pink-400 shadow-lg shadow-pink-500/30 flex items-center justify-center">

                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}

                </div>

                <div className="leading-5">

                  <h3 className="text-white font-semibold">
                    {user.name}
                  </h3>

                  <p className="text-xs text-gray-400">
                    {user.email}
                  </p>

                </div>

              </NavLink>

              <button
                onClick={logout}
                className="bg-pink-600 hover:bg-pink-700 px-5 py-2 rounded-full text-white font-semibold transition duration-300 shadow-lg shadow-pink-600/30"
              >
                Logout
              </button>

            </div>
          )}

        </div>

        {/* Mobile Menu Button */}

        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>

      </div>

            {/* Mobile Menu */}

      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col gap-5">

          <NavLink
            to="/"
            onClick={() => setOpen(false)}
            className="text-white hover:text-pink-500 transition"
          >
            Home
          </NavLink>

          <NavLink
            to="/events"
            onClick={() => setOpen(false)}
            className="text-white hover:text-pink-500 transition"
          >
            Events
          </NavLink>

          {user && (
            <NavLink
              to="/my-tickets"
              onClick={() => setOpen(false)}
              className="text-white hover:text-pink-500 transition"
            >
              My Tickets
            </NavLink>
          )}

          <NavLink
            to="/contact"
            onClick={() => setOpen(false)}
            className="text-white hover:text-pink-500 transition"
          >
            Contact
          </NavLink>

          {user?.role === "admin" && (
            <NavLink
              to="/admin/add-event"
              onClick={() => setOpen(false)}
              className="bg-pink-600 hover:bg-pink-700 text-white text-center py-3 rounded-xl font-semibold transition"
            >
              + Create Event
            </NavLink>
          )}

          {!user ? (
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="bg-pink-600 hover:bg-pink-700 text-white text-center py-3 rounded-xl font-semibold transition"
            >
              Login
            </NavLink>
          ) : (
            <>
              {/* Mobile Profile */}

              <NavLink
                to="/profile"
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 bg-white/5 hover:bg-white/10 rounded-2xl p-4 transition"
              >
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-pink-500 via-pink-600 to-purple-700 border-2 border-pink-400 flex items-center justify-center">

                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-2xl font-bold">
                      {user?.name?.charAt(0).toUpperCase()}
                    </span>
                  )}

                </div>

                <div>

                  <h3 className="text-white font-semibold text-lg">
                    {user.name}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    {user.email}
                  </p>

                </div>

              </NavLink>

              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-semibold transition"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </nav>
  );
};

export default Navbar;