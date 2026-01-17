import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { socket } from "../Socket/socket";

export const RequireCatelogue = () => {
  const [loading, setLoading] = useState(false);

  // 1. Initialize useForm with live validation mode
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange", // This triggers validation on every keystroke
  });

  const onFormSubmit = async (data) => {
    setLoading(true);

    // Prepare the data (Socket.io handles objects directly,
    // but if your backend expects a stringified 'Info' field as per your original code:)
    const payload = {
      Info: JSON.stringify(data),
    };

    // Emit the event via Socket.io
  };

  const handleClose = () => {
    document.getElementById("cateLogue").checked = false;
    reset(); // Resets the form fields and validation errors
  };

  return (
    <div>
      <input type="checkbox" id="cateLogue" className="modal-toggle" />

      <div className="modal">
        <div className="modal-box md:max-w-[700px] relative">
          <div
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
            <h3 className="font-bold text-lg text-secondary">
              Request a Catalogue
            </h3>

            <div className="space-y-3">
              {/* Name Field */}
              <div className="flex flex-col">
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  className={`border-2 font-semibold p-2 w-full rounded-lg outline-none ${errors.name ? "border-red-500" : "border-gray-300 focus:border-secondary"}`}
                  placeholder="Enter Your Name *"
                />
                {errors.name && (
                  <span className="text-red-500 text-xs mt-1 ml-1">
                    {errors.name.message}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div className="flex flex-col">
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={`border-2 font-semibold p-2 w-full rounded-lg outline-none ${errors.email ? "border-red-500" : "border-gray-300 focus:border-secondary"}`}
                  placeholder="Enter Your Email *"
                />
                {errors.email && (
                  <span className="text-red-500 text-xs mt-1 ml-1">
                    {errors.email.message}
                  </span>
                )}
              </div>

              {/* Catalogue Name Field */}
              <div className="flex flex-col">
                <input
                  {...register("cateLogueName", {
                    required: "Catalogue name is required",
                  })}
                  type="text"
                  className={`border-2 font-semibold p-2 w-full rounded-lg outline-none ${errors.cateLogueName ? "border-red-500" : "border-gray-300 focus:border-secondary"}`}
                  placeholder="Enter Catalogue Name *"
                />
                {errors.cateLogueName && (
                  <span className="text-red-500 text-xs mt-1 ml-1">
                    {errors.cateLogueName.message}
                  </span>
                )}
              </div>

              {/* Description Field */}
              <div className="flex flex-col">
                <textarea
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 10,
                      message: "Description must be at least 10 characters",
                    },
                  })}
                  placeholder="Description*"
                  rows="5"
                  className={`w-full font-semibold p-2 border h-[150px] rounded outline-none ${errors.description ? "border-red-500" : "border-gray-300 focus:border-secondary"}`}
                ></textarea>
                {errors.description && (
                  <span className="text-red-500 text-xs mt-1 ml-1">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || loading}
              className="btn btn-secondary w-full"
            >
              Send Catalogue
              {loading && (
                <span className="loading loading-spinner loading-sm ml-2"></span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
