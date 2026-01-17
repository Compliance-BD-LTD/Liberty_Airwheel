import React from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// import banner from "../assets/img/page-title-bg.jpg"
import { useEffect, useState } from "react";
import { socket } from "../Socket/socket";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";

export const ContactModal = ({ selected }) => {
  const [loading, setLoading] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
    phone: "",
    type: "contact",
  });
  const handleSubmit = () => {
    setLoading(true);
    socket.emit("sendQueries", contact, (res) => {
      if (res.status == "ok") {
        setContact({
          name: "",
          email: "",
          subject: "",
          description: "",
          phone: "",
          type: "quote",
        });

        toast.success("We Recieved Your Response!!");

        setTimeout(() => {
          selected?.pdf != ""
            ? (window.location.href = selected?.pdf)
            : toast.error("Sorry No Catalogue Available 😞");
        }, 700);
      } else {
        toast.error("Sorry Error in Server 😞");
      }
      setLoading(false);
    });
  };

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    AOS.init();
  }, []);

  const handleClose = () => {
    
    setContact({
      name: "",
      email: "",
      subject: "",
      description: "",
      phone: "",
      type: "contact",
    });
    setLoading(false)
    document.getElementById("ContactModal").checked = false;
  };

  return (
    <div className="relative">
      <input type="checkbox" id="ContactModal" className="modal-toggle" />

      <div className="modal   " role="dialog">
        <div className="modal-box  md:w-[700px] max-w-5xl relative">
          <div className="text-center font-bold text-2xl py-2 text-orange-500 ">
            <p>Please Fill-Up The Form To Download The Catalogue</p>
          </div>
          <button
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <div className="bg-white overflow-x-hidden rounded shadow md:p-8 flex flex-col space-y-5">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Your Name"
                value={contact.name}
                name="name"
                onChange={handleChange}
                className="flex-1 border border-gray-300 rounded p-3 focus:outline-none focus:border-orange-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contact.email}
                onChange={handleChange}
                name="email"
                className="flex-1 border border-gray-300 rounded p-3 focus:outline-none focus:border-orange-500"
              />
            </div>
            <input
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              placeholder="Phone number *"
              className="w-full p-3 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Subject"
              name="subject"
              value={contact.subject}
              onChange={handleChange}
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-orange-500"
            />
            <textarea
              placeholder="Message"
              rows="5"
              name="description"
              value={contact.description}
              onChange={handleChange}
              className="border border-gray-300 rounded p-3 focus:outline-none focus:border-orange-500 resize-none"
            ></textarea>
            <button
              type="submit"
              disabled={
                !contact.name &&
                !contact.email &&
                !contact.subject &&
                !contact.description &&
                loading
              }
              onClick={handleSubmit}
              className={`  ${
                !contact.name ||
                !contact.email ||
                !contact.subject ||
                !contact.description ||
                loading
                  ? `bg-gray-400 cursor-not-allowed `
                  : `bg-orange-500 hover:bg-orange-500 cursor-pointer`
              }  text-white text-lg font-semibold rounded-full py-3 mt-2 transition`}
            >
              {loading ? (
                <span className="loading loading-dots loading-xl"></span>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </div>

        <label className="modal-backdrop" htmlFor="ContactModal">
          Close
        </label>
      </div>
    </div>
  );
};
