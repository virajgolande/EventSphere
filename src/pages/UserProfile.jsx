import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaTicketAlt,
  FaCalendarCheck,
  FaCheckCircle,
} from "react-icons/fa";
import { Query } from "appwrite";
import { databases } from "../appwrite/config";
import { useAuth } from "../Context/AuthContext";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TICKET_COLLECTION =
  import.meta.env.VITE_APPWRITE_TICKETS_COLLECTION_ID;

const UserProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    valid: 0,
    used: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        TICKET_COLLECTION,
        [Query.equal("userEmail", user.email)]
      );

      const total = response.documents.length;

      const valid = response.documents.filter(
        (ticket) => ticket.status === "VALID"
      ).length;

      const used = response.documents.filter(
        (ticket) => ticket.status === "USED"
      ).length;

      setStats({
        total,
        valid,
        used,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-24 px-6">

      <div className="max-w-5xl mx-auto">

        {/* Profile Card */}

        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div className="w-32 h-32 rounded-full bg-pink-600 flex items-center justify-center text-5xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                {user?.name}
              </h1>

              <p className="text-gray-400 mt-2 flex items-center gap-2">
                <FaEnvelope />
                {user?.email}
              </p>

              <p className="text-pink-500 mt-2 uppercase font-semibold">
                {user?.role}
              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          <div className="bg-white/5 rounded-3xl border border-white/10 p-8 text-center">

            <FaTicketAlt className="text-5xl mx-auto text-pink-500" />

            <h2 className="text-4xl font-bold mt-5">
              {stats.total}
            </h2>

            <p className="text-gray-400 mt-2">
              Tickets Booked
            </p>

          </div>

          <div className="bg-white/5 rounded-3xl border border-white/10 p-8 text-center">

            <FaCalendarCheck className="text-5xl mx-auto text-green-500" />

            <h2 className="text-4xl font-bold mt-5">
              {stats.valid}
            </h2>

            <p className="text-gray-400 mt-2">
              Upcoming Events
            </p>

          </div>

          <div className="bg-white/5 rounded-3xl border border-white/10 p-8 text-center">

            <FaCheckCircle className="text-5xl mx-auto text-cyan-400" />

            <h2 className="text-4xl font-bold mt-5">
              {stats.used}
            </h2>

            <p className="text-gray-400 mt-2">
              Events Attended
            </p>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-12 bg-white/5 rounded-3xl border border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/events")}
              className="bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              Browse Events
            </button>

            <button
              onClick={() => navigate("/my-tickets")}
              className="border border-pink-500 text-pink-500 hover:bg-pink-600 hover:text-white px-6 py-3 rounded-xl transition"
            >
              My Tickets
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;