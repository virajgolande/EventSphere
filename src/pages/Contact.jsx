import React, { useState } from "react";
import feedbackService from "../appwrite/FeedbackService";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await feedbackService.addFeedback(form);

      alert("Message Sent Successfully!");

      setForm({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.log(error);

      alert("Failed To Send Message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Left Side */}
          <div className="space-y-8">

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Address
              </h3>

              <p className="text-gray-400">
                Pune, Maharashtra, India
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Email
              </h3>

              <p className="text-gray-400">
                support@eventsphere.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Phone
              </h3>

              <p className="text-gray-400">
                +91 9876543210
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                About EventSphere
              </h3>

              <p className="text-gray-400 leading-7">
                EventSphere helps users discover,
                explore and book events quickly.
                We aim to make event management
                simple and accessible.
              </p>
            </div>

          </div>

          {/* Right Side */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-xl"
          >

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="w-full bg-black/40 p-3 rounded-lg"
              />

              <input
                type="email"
                placeholder="Email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({
                    ...form,
                    email: e.target.value,
                  })
                }
                className="w-full bg-black/40 p-3 rounded-lg"
              />

              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-black/40 p-3 rounded-lg"
              />

              <textarea
                rows="5"
                placeholder="Message"
                required
                value={form.message}
                onChange={(e) =>
                  setForm({
                    ...form,
                    message: e.target.value,
                  })
                }
                className="w-full bg-black/40 p-3 rounded-lg"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pink-600 hover:bg-pink-700 py-3 rounded-lg font-semibold"
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Contact;