import React from "react";
import EventList from "../components/EventList";

const Event = () => {
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-black overflow-auto no-scrollbar scrollbar-hide">
      <EventList />
    </div>
  );
};

export default Event;
