import React from "react";
import { useNavigate } from "react-router-dom";
import storageService from "../appwrite/storageservice";
import ticketService from "../appwrite/TicketService";
import eventService from "../appwrite/EventService";
import { useAuth } from "../Context/AuthContext";

const EventCard = ({ event, onTicketBooked }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBookTicket = async () => {
    // User must login first
    if (!user) {
      alert("Please login to book your ticket.");
      navigate("/login");
      return;
    }

    // Tickets Sold Out
    if (event.ticketleft <= 0) {
      alert("Sorry! Tickets are Sold Out.");
      return;
    }

    try {
      const ticketId = `TKT-${Date.now()}`;

      // Create Ticket
      await ticketService.createTicket({
        ticketId,
        eventId: event.$id,

        userName: user.name,
        userEmail: user.email,

        title: event.title,
        location: event.location,
        date: event.date,
        time: event.time,
      });

      // Reduce ticket count
      await eventService.updateTicketLeft(
        event.$id,
        event.ticketleft - 1
      );
      onTicketBooked(event.$id);

      // Open Ticket
      navigate(`/ticket/${ticketId}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const soldOut = event.ticketleft <= 0;

  return (
    <div
      className="group relative flex flex-col sm:flex-row sm:items-center gap-5
                 rounded-3xl bg-white/[0.03] border border-white/10
                 hover:border-pink-500/40 hover:bg-white/[0.05]
                 transition-colors duration-300 p-4 sm:p-5"
    >
      {/* Image */}
      <div className="relative flex-shrink-0 w-full sm:w-40 h-40 sm:h-28">
        <img
          src={
            event.image
              ? storageService.getImageUrl(event.image)
              : "/concert.jpg"
          }
          alt={event.title}
          className="w-full h-full object-cover rounded-2xl"
        />
        <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-pink-400 text-[11px] font-medium px-2.5 py-1 rounded-full border border-pink-500/30">
          {event.ticketleft} left
        </span>
      </div>

      {/* Title */}
      <div className="flex-1 min-w-0">
        <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug line-clamp-2">
          {event.title}
        </h2>
        <p className="text-gray-400 mt-1 text-sm truncate">
          {event.location}
        </p>
      </div>

      {/* Date / time meta */}
      <div className="flex sm:flex-col gap-x-3 gap-y-1 sm:items-end text-xs sm:text-sm text-gray-400 sm:w-40 shrink-0">
        <span>{event.date}</span>
        <span className="hidden sm:inline text-gray-600">•</span>
        <span>{event.time}</span>
      </div>

      {/* CTA */}
      <button
        onClick={handleBookTicket}
        disabled={soldOut}
        className={`shrink-0 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
          soldOut
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-pink-600/20"
        }`}
      >
        {soldOut ? "Sold Out" : "Buy Ticket →"}
      </button>
    </div>
  );
};

export default EventCard;