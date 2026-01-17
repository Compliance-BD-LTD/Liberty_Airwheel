import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactSection = ({ selected }) => {
  const [loading, setLoading] = useState(false);

  // 1. Setup React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // Validates as user types
    defaultValues: {
      type: "contact",
    },
  });

  useEffect(() => {
    AOS.init();
  }, []);

  // 2. Optimized Submit Handler
  const onSubmit = (data) => {
    setLoading(true);

    // If 'selected' exists, ensure the subject is passed even if disabled
    const payload = {
      ...data,
      subject: selected?.name || data.subject,
    };

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/sendMail`, payload)
      .then((res) => {
        if (res.status === 200) {
          toast.success("We Received Your Response!!");

          // Save expiry timestamp to localStorage
          if (res.data?.expirey) {
            localStorage.setItem("expirey", res.data.expirey);
          }

          reset(); // Clear form

          // Optional: Redirect to PDF if applicable
          if (selected?.pdf) {
            setTimeout(() => {
              window.location.href = selected.pdf;
            }, 700);
          }
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error sending message",
          text:
            err?.response?.data?.message ||
            "Something went wrong on the server.",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="overflow-x-hidden">
      <div className="md:max-w-[1340px] mx-auto py-10 px-4">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded shadow p-8 flex flex-col items-center">
            <FaMapMarkerAlt className="text-cyan-500 text-5xl mb-2 border-2 border-dotted border-yellow-200 rounded-full p-2" />
            <div className="text-lg font-semibold text-gray-700 mb-1">
              Address
            </div>
            <div className="text-gray-500 text-center">
              418 BROADWAY STE R, ALBANY NY 12207
            </div>
          </div>

          <div className="bg-white rounded shadow p-8 flex flex-col items-center">
            <FaPhoneAlt className="text-cyan-500 text-5xl mb-2 border-2 border-dotted border-yellow-200 rounded-full p-2" />
            <div className="text-lg font-semibold text-gray-700 mb-1">
              Call Us
            </div>
            <div className="text-gray-500 text-center">+1 3322 5228 17</div>
          </div>

          <div className="bg-white rounded shadow p-8 flex flex-col items-center">
            <FaEnvelope className="text-cyan-500 text-5xl mb-2 border-2 border-dotted border-yellow-200 rounded-full p-2" />
            <div className="text-lg font-semibold text-gray-700 mb-1">
              Email Us
            </div>
            <div className="text-gray-500 text-center">
              info@libertyairwheel.com
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Map */}
          <div
            className="bg-white rounded shadow overflow-hidden"
            data-aos="fade-right"
            data-aos-duration="1500"
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2934.123!2d-73.75!3d42.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDM5JzAwLjAiTiA3M8KwNDUnMDAuMCJX!5e0!3m2!1sen!2sus!4v123456789"
              className="w-full h-full min-h-[350px]"
              loading="lazy"
            ></iframe>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded shadow p-8 flex flex-col space-y-4"
            data-aos="fade-left"
            data-aos-duration="1500"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  {...register("name", { required: "Name is required" })}
                  placeholder="Your Name"
                  className={`w-full border p-3 rounded focus:outline-none ${errors.name ? "border-red-500" : "focus:border-cyan-500 border-gray-300"}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Provide valid to get Confirmation Mail",
                    },
                  })}
                  placeholder="Your Email"
                  className={`w-full border p-3 rounded focus:outline-none ${errors.email ? "border-red-500" : "focus:border-cyan-500 border-gray-300"}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Use international format (e.g., +1234567890)",
                  },
                })}
                placeholder="Phone number *"
                className={`w-full p-3 border rounded focus:outline-none ${errors.phone ? "border-red-500" : "border-gray-300 focus:border-cyan-500"}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <input
                {...register("subject", {
                  required: "Subject is required",
                  disabled: !!selected?.name,
                })}
                defaultValue={selected?.name || ""}
                placeholder="Subject"
                className={`w-full border p-3 rounded focus:outline-none ${selected?.name ? "bg-gray-100 cursor-not-allowed" : "focus:border-cyan-500 border-gray-300"}`}
              />
            </div>

            <div>
              <textarea
                {...register("description", {
                  required: "Message is required",
                })}
                placeholder="Message"
                rows="4"
                className={`w-full border p-3 rounded focus:outline-none resize-none ${errors.description ? "border-red-500" : "focus:border-cyan-500 border-gray-300"}`}
              ></textarea>
              {errors.description && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              className={`text-white text-lg font-semibold rounded-full py-3 mt-2 transition ${
                !isValid || loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600 shadow-md"
              }`}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
