import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ticketService from "../appwrite/TicketService";

const VerifyTicket = () => {
  const { ticketId } = useParams();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const loadTicket = async () => {
    setLoading(true);

    try {
      let data = null;

      // Try up to 5 times (wait 300ms between tries)
      for (let i = 0; i < 5; i++) {
        data = await ticketService.getTicket(ticketId);

        if (data) {
          break;
        }

        await new Promise((resolve) =>
          setTimeout(resolve, 300)
        );
      }

      setTicket(data);
    } catch (error) {
      console.log(error);
      setTicket(null);
    } finally {
      setLoading(false);
    }
  };

  loadTicket();
}, [ticketId]);

  const handleVerify = async () => {
  try {
    if (ticket.status === "USED") {
      alert("This ticket has already been used.");
      return;
    }

    await ticketService.verifyTicket(ticket.ticketId);

    // Reload updated ticket from Appwrite
    const updatedTicket = await ticketService.getTicket(ticket.ticketId);
    setTicket(updatedTicket);

    alert("Ticket Verified Successfully ✅");
  } catch (error) {
    console.error(error);

    alert(error?.message || JSON.stringify(error));
  }
};

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex justify-center items-center text-white text-2xl">
        Loading Ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex justify-center items-center text-red-500 text-2xl">
        Invalid Ticket
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] flex justify-center items-center px-5 py-10">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">

        {/* Header */}

        <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white text-center py-6">

          <h1 className="text-3xl font-bold">
            EventSphere
          </h1>

          <p className="mt-2">
            Ticket Verification
          </p>

        </div>

        {/* Body */}

        <div className="p-8">

          <h2 className="text-3xl font-bold text-center text-gray-800">
            {ticket.title}
          </h2>

          <div className="mt-8 space-y-4">

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">
                Name
              </span>

              <span className="font-bold">
                {ticket.userName}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">
                Email
              </span>

              <span className="font-bold text-right">
                {ticket.userEmail}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">
                Date
              </span>

              <span className="font-bold">
                {ticket.date}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">
                Time
              </span>

              <span className="font-bold">
                {ticket.time}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">
                Location
              </span>

              <span className="font-bold text-right">
                {ticket.location}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500 font-medium">
                Ticket ID
              </span>

              <span className="font-bold">
                {ticket.ticketId}
              </span>
            </div>

          </div>

          {/* Status */}

          <div className="flex justify-center mt-8">

            {ticket.status === "VALID" ? (
              <span className="bg-green-500 text-white px-6 py-2 rounded-full font-bold">
                ✅ VALID
              </span>
            ) : (
              <span className="bg-red-500 text-white px-6 py-2 rounded-full font-bold">
                ❌ USED
              </span>
            )}

          </div>

          {/* Button */}

          <button
            disabled={ticket.status === "USED"}
            onClick={handleVerify}
            className={`w-full mt-8 py-4 rounded-xl font-bold transition duration-300 ${
              ticket.status === "USED"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700 text-white"
            }`}
          >
            {ticket.status === "VALID"
              ? "Verify Entry"
              : "Ticket Already Used"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default VerifyTicket;