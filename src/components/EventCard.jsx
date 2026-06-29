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

      // console.log(user);
      
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

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 py-6">

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">

        {/* Date */}
        <div className="text-gray-400 text-sm w-28">
          {event.date}
        </div>

        {/* Image */}
        <img
          src={
            event.image
              ? storageService.getImageUrl(event.image)
              : "/concert.jpg"
          }
          alt={event.title}
          className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
        />

        {/* Event Details */}
        <div>

          <span className="inline-block bg-pink-600 text-white text-xs px-3 py-1 rounded-full mb-2">
            🎟 {event.ticketleft} Tickets Left
          </span>

          <h2 className="text-2xl font-bold text-white h-16 line-clamp-2">
            {event.title}
            </h2>

          <p className="text-gray-400 mt-1">
            📍 {event.location}
          </p>

          <p className="text-gray-500 text-sm">
            🕒 {event.time}
          </p>

        </div>

      </div>

      <button
        onClick={handleBookTicket}
        disabled={event.ticketleft <= 0}
        className={`px-6 py-3 rounded-lg font-semibold transition duration-300 ${
          event.ticketleft <= 0
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-pink-600 hover:bg-pink-700 shadow-lg shadow-pink-600/30"
        } text-white`}
      >
        {event.ticketleft <= 0
          ? "Sold Out"
          : "Book Ticket"}
      </button>

    </div>
  );
};

export default EventCard;