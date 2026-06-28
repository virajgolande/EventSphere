import React from "react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Event from "./pages/Event";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Ticket from "./pages/Ticket";
import VerifyTicket from "./pages/VerifyTicket";
import AdminAddEvent from "./pages/AdminAddEvent";
import MyTickets from "./pages/MyTickets";
import UserProfile from "./pages/UserProfile";
import Scanner from "./pages/Scanner";

const App = () => {
  return (
    <>
      <Navbar />

      <div className="pt-20 min-h-screen bg-black overflow-x-hidden">

        <Routes>

          {/* Home */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />

          {/* Events */}
          <Route path="/events" element={<Event />} />

          {/* User Tickets */}
          <Route
            path="/my-tickets"
            element={<MyTickets />}
          />

          {/* Ticket */}
          <Route
            path="/ticket/:ticketId"
            element={<Ticket />}
          />

          {/* QR Verification */}
          <Route
            path="/verify/:ticketId"
            element={<VerifyTicket />}
          />

          {/* Contact */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* Authentication */}
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* Admin */}
          <Route
            path="/admin/add-event"
            element={<AdminAddEvent />}
          />

          <Route path="/profile" element={<UserProfile />} />


          {/* Scanner */}
          <Route path="/scanner" element={<Scanner />} />

        </Routes>

      </div>
    </>
  );
};

export default App;