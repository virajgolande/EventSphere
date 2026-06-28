import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import eventService from "../appwrite/EventService";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await eventService.getEvents();
      setEvents(res?.documents || []);
    };
    fetchEvents();
  }, []);

  // Filter Events
  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-black text-white h-screen flex flex-col overflow-hidden px-4 md:px-10 pt-24">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        All Events
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search events..."
        className="w-full md:w-1/2 px-4 py-3 mb-4 rounded bg-white/10 border border-white/10 focus:outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Scrollable Event List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide pr-2">
        {filteredEvents.length === 0 ? (
          <p className="text-gray-400">No events found</p>
        ) : (
          filteredEvents.map((event) => (
  <EventCard
    key={event.$id}
    event={event}
    onTicketBooked={(eventId) => {
      setEvents((prevEvents) =>
        prevEvents.map((e) =>
          e.$id === eventId
            ? {
                ...e,
                ticketleft: Math.max(0, e.ticketleft - 1),
              }
            : e
        )
      );
    }}
  />
))
        )}
      </div>
    </div>
  );
};

export default EventList;