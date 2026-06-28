import React, { useState } from "react";
import eventService from "../appwrite/EventService";

const AdminAddEvent = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    ticketLeft: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await eventService.addEvent({
        ...form,
        image: file,
      });

      alert("✅ Event Added Successfully!");

      setForm({
        title: "",
        date: "",
        time: "",
        location: "",
        ticketLeft: "",
      });

      setFile(null);
    } catch (error) {
      console.log(error);
      alert("❌ Error Adding Event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-xl">

        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

          <h1 className="text-3xl font-bold text-white text-center mb-8">
            Create Event
          </h1>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Event Title */}
            <input
              type="text"
              placeholder="Event Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="w-full bg-black/40 text-white p-3 rounded-lg outline-none border border-white/10"
              required
            />

            {/* Date */}
            <input
              type="date"
              value={form.date}
              onChange={(e) =>
                setForm({
                  ...form,
                  date: e.target.value,
                })
              }
              className="w-full bg-black/40 text-white p-3 rounded-lg outline-none border border-white/10"
              required
            />

            {/* Time */}
            <input
              type="time"
              value={form.time}
              onChange={(e) =>
                setForm({
                  ...form,
                  time: e.target.value,
                })
              }
              className="w-full bg-black/40 text-white p-3 rounded-lg outline-none border border-white/10"
              required
            />

            {/* Location */}
            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) =>
                setForm({
                  ...form,
                  location: e.target.value,
                })
              }
              className="w-full bg-black/40 text-white p-3 rounded-lg outline-none border border-white/10"
              required
            />

            {/* Tickets */}
            <input
              type="number"
              placeholder="Tickets Left"
              value={form.ticketLeft}
              onChange={(e) =>
                setForm({
                  ...form,
                  ticketLeft: e.target.value,
                })
              }
              className="w-full bg-black/40 text-white p-3 rounded-lg outline-none border border-white/10"
              required
            />

            {/* Image Upload */}
            <div>
              <label className="text-gray-300 block mb-2">
                Event Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
                className="w-full text-white"
                required
              />
            </div>

            {/* Image Preview */}
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-52 object-cover rounded-lg border border-white/10"
              />
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-600 hover:bg-pink-700 transition py-3 rounded-lg text-white font-semibold"
            >
              {loading
                ? "Creating Event..."
                : "Create Event"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAddEvent;