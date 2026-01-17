import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";

export const ContactModal = ({ selected }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  // IMPORTANT: This updates the form whenever the "selected" prop changes
  useEffect(() => {
    if (selected) {
      reset({
        name: "",
        email: "",
        phone: "",
        subject: "Seeking " + selected?.name || "", // Setting subject from selected name
        description: "",
      });
    }
  }, [selected, reset]);

  useEffect(() => {
    AOS.init();
  }, []);

  const onFormSubmit = (formData) => {
    setLoading(true);

    // Because 'subject' is disabled when selected exists, RHF excludes it.
    // We manually add it back to the payload here.
    const payload = {
      ...formData,
      subject: selected?.name || formData.subject,
    };
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/sendMail`, payload) // Fixed typo: senEmail -> sendEmail
      .then((res) => {
        if (res.status === 200) {
          toast.success("We Received Your Response!!");
          // handleClose(); // Use handleClose to reset and hide modal
          console.log("Res", res.data);

          localStorage.setItem("expirey", res.data.expirey);
          setTimeout(() => {
            if (selected?.pdf) {
              window.location.href = selected.pdf;
            } else {
              toast.error("Sorry No Catalogue Available 😞");
            }
          }, 700);
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error sending message",
          text: err?.response?.data?.message || err?.message,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    reset();
    document.getElementById("ContactModal").checked = false;
  };

  return (
    <div className="relative">
      <input type="checkbox" id="ContactModal" className="modal-toggle" />

      <div className="modal" role="dialog">
        <div className="modal-box md:w-[700px] max-w-5xl relative">
          <div className="text-center font-bold text-xl md:text-2xl py-2 text-orange-500">
            <p>Please Fill-Up The Form To Download The Catalogue</p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>

          <form
            onSubmit={handleSubmit(onFormSubmit)}
            className="bg-white overflow-x-hidden rounded shadow md:p-8 flex flex-col space-y-4"
          >
            <div className="flex flex-col md:flex-row gap-4">
              {/* Name */}
              <div className="flex-1">
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder="Your Name"
                  className={`w-full border rounded p-3 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300 focus:border-orange-500"}`}
                />
                {errors.name && (
                  <span className="text-red-500 text-xs">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="flex-1">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Provide Correct one To get Confirmation Mail",
                    },
                  })}
                  type="email"
                  placeholder="Your Email"
                  className={`w-full border rounded p-3 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300 focus:border-orange-500"}`}
                />
                {errors.email && (
                  <span className="text-red-500 text-xs">
                    {errors.email.message}
                  </span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <input
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Invalid format (e.g. +1234567890)",
                  },
                })}
                type="text"
                placeholder="Phone number *"
                className={`w-full p-3 border rounded focus:outline-none ${errors.phone ? "border-red-500" : "border-gray-300 focus:border-orange-500"}`}
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Subject - Properly handled with selected prop */}
            <div>
              <input
                {...register("subject", {
                  required: "Subject is required",
                  disabled: !!selected?.name, // Field disabled if name exists
                })}
                type="text"
                placeholder="Subject"
                className={`w-full border rounded p-3 focus:outline-none transition-all ${
                  selected?.name
                    ? "bg-gray-100 cursor-not-allowed text-gray-500 border-gray-200"
                    : errors.subject
                      ? "border-red-500"
                      : "border-gray-300 focus:border-orange-500"
                }`}
              />
              {errors.subject && !selected?.name && (
                <span className="text-red-500 text-xs">
                  {errors.subject.message}
                </span>
              )}
            </div>

            {/* Message Area */}
            <div>
              <textarea
                {...register("description", {
                  required: "Message is required",
                })}
                placeholder="Message"
                rows="4"
                className={`w-full border rounded p-3 focus:outline-none resize-none ${errors.description ? "border-red-500" : "border-gray-300 focus:border-orange-500"}`}
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-xs">
                  {errors.description.message}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              className={`text-white text-lg font-semibold rounded-full py-3 mt-2 transition ${
                !isValid || loading
                  ? `bg-gray-400 cursor-not-allowed`
                  : `bg-orange-500 hover:bg-orange-600 cursor-pointer shadow-lg`
              }`}
            >
              {loading ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </div>

        <label
          className="modal-backdrop"
          htmlFor="ContactModal"
          onClick={handleClose}
        >
          Close
        </label>
      </div>
    </div>
  );
};
