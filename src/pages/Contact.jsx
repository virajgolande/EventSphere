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
      console.error(error);

      alert(error?.message || JSON.stringify(error));
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full bg-white/[0.03] border border-white/10 p-3 rounded-xl placeholder:text-gray-500 focus:outline-none focus:border-pink-500/40 transition";

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Contact Us
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Left Side */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 space-y-8">

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
                virajgolande30@gmail.com
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Phone
              </h3>

              <p className="text-gray-400">
                +91 9730316235
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
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8"
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
                className={inputClasses}
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
                className={inputClasses}
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
                className={inputClasses}
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
                className={inputClasses}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 disabled:opacity-60 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-pink-600/20"
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