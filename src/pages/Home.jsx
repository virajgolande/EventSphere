import React from "react";
import { Link } from "react-router-dom";
import {
  FaCalendarAlt,
  FaQrcode,
  FaUserShield,
} from "react-icons/fa";

const Home = () => {
  return (
    <div className="bg-black text-white">

      {/* HERO */}

      <section
        className="relative min-h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/concert.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen text-center px-6">

          <span className="bg-pink-600/20 border border-pink-500/30 text-pink-400 px-5 py-2 rounded-full mb-6">
            🎟 Welcome To EventSphere
          </span>

          <h1 className="text-5xl md:text-8xl font-black leading-tight">
            DISCOVER
            <br />
            AMAZING EVENTS
          </h1>

          <p className="mt-6 max-w-3xl text-lg md:text-2xl text-gray-300">
            Discover concerts, workshops, hackathons, cultural festivals,
            seminars and sports events. Book tickets instantly with secure QR
            verification.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-10">

            <Link
              to="/events"
              className="bg-pink-600 hover:bg-pink-700 px-8 py-4 rounded-full font-semibold transition"
            >
              Explore Events
            </Link>

            <Link
              to="/contact"
              className="border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full transition"
            >
              Contact Us
            </Link>

          </div>

        </div>

      </section>

      {/* WHY EVENTSPHERE */}

      <section className="py-24 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-16">
            Why Choose EventSphere?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-pink-500 transition">

              <FaCalendarAlt className="text-5xl text-pink-500 mb-5" />

              <h3 className="text-2xl font-bold">
                Easy Booking
              </h3>

              <p className="mt-4 text-gray-400">
                Browse upcoming events and reserve your ticket within seconds.
              </p>

            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-pink-500 transition">

              <FaQrcode className="text-5xl text-pink-500 mb-5" />

              <h3 className="text-2xl font-bold">
                QR Verification
              </h3>

              <p className="mt-4 text-gray-400">
                Every ticket contains a unique QR Code for secure entry.
              </p>

            </div>

            <div className="bg-white/5 rounded-3xl p-8 border border-white/10 hover:border-pink-500 transition">

              <FaUserShield className="text-5xl text-pink-500 mb-5" />

              <h3 className="text-2xl font-bold">
                Secure Platform
              </h3>

              <p className="mt-4 text-gray-400">
                User authentication and ticket validation powered by Appwrite.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}

      <section className="bg-[#111] py-24">

        <h2 className="text-center text-4xl font-bold">
          How It Works
        </h2>

        <div className="max-w-6xl mx-auto mt-16 grid md:grid-cols-4 gap-10 px-6">

          <div className="text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-pink-600 flex items-center justify-center text-2xl font-bold">
              1
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Login
            </h3>

            <p className="mt-3 text-gray-400">
              Create your account securely.
            </p>

          </div>

          <div className="text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-pink-600 flex items-center justify-center text-2xl font-bold">
              2
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Book Ticket
            </h3>

            <p className="mt-3 text-gray-400">
              Reserve your event instantly.
            </p>

          </div>

          <div className="text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-pink-600 flex items-center justify-center text-2xl font-bold">
              3
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Get QR
            </h3>

            <p className="mt-3 text-gray-400">
              Receive your personalized QR ticket.
            </p>

          </div>

          <div className="text-center">

            <div className="w-16 h-16 mx-auto rounded-full bg-pink-600 flex items-center justify-center text-2xl font-bold">
              4
            </div>

            <h3 className="mt-6 text-xl font-semibold">
              Attend Event
            </h3>

            <p className="mt-3 text-gray-400">
              Show your QR and enjoy the event.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="py-24 text-center px-6">

        <h2 className="text-5xl font-bold">
          Ready To Join The Next Event?
        </h2>

        <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
          Explore exciting events happening near you and reserve your seat in
          just a few clicks.
        </p>

        <Link
          to="/events"
          className="inline-block mt-10 bg-pink-600 hover:bg-pink-700 px-10 py-4 rounded-full font-semibold"
        >
          Explore Events
        </Link>

      </section>

    </div>
  );
};

export default Home;