import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useParams, useLocation } from "react-router-dom";
import ticketService from "../appwrite/TicketService";

const Ticket = () => {
  const { ticketId } = useParams();
  const location = useLocation();

  const [ticket, setTicket] = useState(location.state || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTicket = async () => {
      try {
        if (!ticket) {
          const data = await ticketService.getTicket(ticketId);

          if (data) {
            setTicket(data);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadTicket();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex justify-center items-center text-white text-2xl">
        Loading Ticket...
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex justify-center items-center text-red-500 text-2xl">
        Invalid Ticket
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex justify-center items-center p-6">

      <div className="w-full max-w-md rounded-3xl overflow-hidden bg-white shadow-2xl">

        {/* Header */}
        <div className="bg-gradient-to-r from-pink-600 to-pink-500 text-white text-center py-6">

          <h2 className="text-3xl font-bold">
            EventSphere
          </h2>

          <p className="opacity-90 mt-1">
            Your Event Ticket
          </p>

        </div>

        {/* Event */}
        <div className="p-6">

          <h1 className="text-3xl font-bold text-center text-gray-900">
            {ticket.title}
          </h1>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">
                Name
              </span>

              <span className="font-bold text-gray-900">
                {ticket.userName}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">
                Email
              </span>

              <span className="font-bold text-gray-900 text-right">
                {ticket.userEmail}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">
                Date
              </span>

              <span className="font-bold text-gray-900">
                {ticket.date}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">
                Time
              </span>

              <span className="font-bold text-gray-900">
                {ticket.time}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">
                Location
              </span>

              <span className="font-bold text-gray-900 text-right">
                {ticket.location}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="font-semibold text-gray-500">
                Booked On
              </span>

              <span className="font-bold text-gray-900">
                {ticket.bookedAt}
              </span>
            </div>

          </div>

          {/* Status */}

          <div className="flex justify-center mt-6">

            <span className="bg-green-500 text-white px-6 py-2 rounded-full font-bold">
              {ticket.status}
            </span>

          </div>

          {/* QR */}

          <div className="flex justify-center mt-8">

            <div className="bg-white p-4 rounded-xl shadow">

              <QRCodeCanvas
                value={`${import.meta.env.VITE_APP_URL}/verify/${ticket.ticketId}`}
                size={220}
              />

            </div>

          </div>

          {/* Ticket ID */}

          <div className="text-center mt-6">

            <p className="text-gray-500 text-sm">
              Ticket ID
            </p>

            <h2 className="font-bold text-lg">
              {ticket.ticketId}
            </h2>

          </div>

          <div className="mt-6 bg-pink-50 rounded-xl p-4 border border-pink-200">

            <p className="text-pink-700 text-sm text-center font-medium">

              Please show this ticket at the event entrance.
              <br />
              The QR Code will be scanned by the event organizer.

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Ticket;