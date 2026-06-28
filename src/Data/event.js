import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import eventService from "../appwrite/EventService";

const Event = () => {
  const [events, setEvents] = useState([]);

  // ✅ Fetch events from Appwrite
  const fetchEvents = async () => {
    try {
      const res = await eventService.getEvents();
      setEvents(res.documents); // Appwrite returns documents
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-10 py-10">
      <h1 className="text-3xl font-bold mb-10">All Events</h1>

      {/* ✅ Show Events */}
      {events.length === 0 ? (
        <p className="text-gray-400">No events found...</p>
      ) : (
        events.map((event) => (
          <EventCard key={event.$id} event={event} />
        ))
      )}
    </div>
  );
};

export default Event;
