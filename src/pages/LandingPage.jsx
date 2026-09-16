import React from "react";
import Home from "./Home";
import Event from "./Event";
import Contact from "./Contact";

const LandingPage = () => {
  return (
    <div className="bg-black text-white">
      <section id="home">
        <Home />
      </section>

      <section id="events">
        <Event />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
};

export default LandingPage;