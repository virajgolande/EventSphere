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
    <section className="bg-black text-white min-h-screen px-4 md:px-10 py-24">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">
            All Events
          </h1>

          {/* Search */}
          <input
            type="text"
            placeholder="Search events..."
            className="w-full sm:w-72 px-4 py-3 rounded-full bg-white/[0.04] border border-white/10 text-sm
                       placeholder:text-gray-500 focus:outline-none focus:border-pink-500/40 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Event List */}
        <div className="flex flex-col gap-4">
          {filteredEvents.length === 0 ? (
            <p className="text-gray-500 text-center py-16">No events found</p>
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
    </section>
  );
};

export default EventList;