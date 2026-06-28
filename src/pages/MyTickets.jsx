import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Query } from "appwrite";
import { databases } from "../appwrite/config";
import { useAuth } from "../Context/AuthContext";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const TICKET_COLLECTION =
  import.meta.env.VITE_APPWRITE_TICKETS_COLLECTION_ID;

const MyTickets = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        TICKET_COLLECTION,
        [
          Query.equal(
            "userEmail",
            user.email
          )
        ]
      );

      setTickets(response.documents);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Loading Tickets...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white px-6 py-24">

      <h1 className="text-4xl font-bold mb-10">
        My Tickets
      </h1>

      {tickets.length === 0 ? (
        <div className="text-center mt-20">

          <h2 className="text-2xl">
            No Tickets Booked Yet
          </h2>

          <p className="text-gray-400 mt-3">
            Book your first event ticket.
          </p>

        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {tickets.map((ticket) => (

            <div
              key={ticket.$id}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-lg hover:border-pink-500 transition flex flex-col h-[360px]"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold min-h-[72px] leading-tight">
                  {ticket.title}
                </h2>

                <span
                  className={`px-4 py-1 rounded-full text-sm font-bold ${
                    ticket.status === "VALID"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {ticket.status}
                </span>

              </div>

              <div className="mt-5 space-y-2 text-gray-300 flex-1">

                <p>
                  📍 {ticket.location}
                </p>

                <p>
                  📅 {ticket.date}
                </p>

                <p>
                  🕒 {ticket.time}
                </p>

              </div>

              <button
                onClick={() =>
                  navigate(
                    `/ticket/${ticket.ticketId}`
                  )
                }
                className="mt-auto w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-xl font-semibold transition duration-300"
              >
                View Ticket
              </button>

            </div>

          ))}

        </div>
      )}
    </div>
  );
};

export default MyTickets;