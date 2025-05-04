import React, { useEffect, useState } from "react";
import { MdOutlineMailOutline, MdOutlineMessage } from "react-icons/md";
import { HiOutlineUser } from "react-icons/hi";
import { IoSendSharp } from "react-icons/io5";

function SendMessage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      alert("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto w-full px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Send us a message and we'll get back to you as soon as possible
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Your Name
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter your full name"
                  required
                />
                <HiOutlineUser className="text-lg text-gray-500" />
              </div>
            </div>

            <div className="form-group">
              <label className="block text-gray-700 mb-2 font-medium text-sm">
                Email Address
              </label>
              <div className="flex px-3 border border-gray-300 bg-white rounded-lg justify-between items-center h-12 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full focus:outline-none text-base"
                  placeholder="Enter your email"
                  required
                />
                <MdOutlineMailOutline className="text-lg text-gray-500" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="block text-gray-700 mb-2 font-medium text-sm">
              Your Message
            </label>
            <div className="flex px-3 py-2 border border-gray-300 bg-white rounded-lg items-start h-32 focus-within:ring-2 focus-within:ring-sky-500 focus-within:border-sky-500 transition-all">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-full focus:outline-none text-base resize-none"
                placeholder="Enter your message here..."
                required
              />
              <MdOutlineMessage className="text-lg text-gray-500 mt-1 flex-shrink-0" />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="bg-sky-600 hover:bg-sky-700 transition-colors flex items-center justify-center gap-2 cursor-pointer text-base rounded-lg font-medium w-full text-white py-3"
              disabled={submitting}
            >
              {submitting ? (
                "Sending..."
              ) : (
                <>
                  <IoSendSharp className="text-lg" />
                  Send Message
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;
