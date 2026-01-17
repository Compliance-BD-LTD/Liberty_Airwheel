import axios from "axios";
import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";
import { socket } from "../Socket/socket";

export const RequireCatelogue = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cateLogueName, setCatelogueName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !cateLogueName || !email) {
      Swal.fire({
        icon: "error",
        title: "Missing File or Name",
      });
      return;
    }

    const formData = new FormData();

    formData.append(
      "Info",
      JSON.stringify({
        name,
        email,
        cateLogueName,
        description,
      }),
    );

    // Log form data to debug
    setLoading(true);

    socket.emit("sendCatelogue", formData, (response) => {
      if (response.status === "success") {
        Swal.fire({
          icon: "success",
          title: "Catelogue Sent Successfully",
        });
        setName("");
        setCatelogueName("");
        setDescription("");
        setEmail("");
        document.getElementById("cateLogue").checked = false;
      } else {
        Swal.fire({
          icon: "error",
          title: "Error Sending Catelogue",
          text: response.message,
        });
      }
      setLoading(false);
    });

    // try {
    //     const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addBlog`, formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         }
    //     });
    //     if (res.status == 200) {

    //         Swal.fire({
    //             icon: "success",
    //             title: "Uploaded Successfully",
    //         });
    //         setName('')
    //         setCatelogueName('')
    //         setDescription('')
    //         setEmail('')
    //         handleClose()
    //     }

    //     // reset file input

    // } catch (err) {
    //     Swal.fire({
    //         icon: "error",
    //         title: "Error uploading",
    //         text: err.message
    //     });
    // } finally {
    //     setLoading(false);
    // }
  };

  const handleClose = () => {
    document.getElementById("cateLogue").checked = false;
    setName("");
    setLoading(false);
    setCatelogueName("");
    setDescription("");
  };

  return (
    <div>
      <input type="checkbox" id="cateLogue" className="modal-toggle" />

      {/* Modal Box */}
      <div className="modal">
        <div className="modal-box md:max-w-[700px] md:h-auto overflow-y-auto  relative">
          {/* Close Button */}
          <div
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </div>

          <section className="space-y-4 ">
            <div className="space-y-2">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 font-semibold border-gray-300 p-2  w-full rounded-lg"
                placeholder="Enter Your Name *"
                id=""
              />

              <input
                type="text"
                required
                value={email}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 font-semibold border-gray-300 p-2  w-full rounded-lg"
                placeholder="Enter Your Email *"
                id=""
              />

              <input
                type="text"
                required
                value={cateLogueName}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 font-semibold border-gray-300 p-2  w-full rounded-lg"
                placeholder="Enter Catelogue Name *"
                id=""
              />

              <textarea
                placeholder="Description*"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
                rows="5"
                className="w-full font-semibold p-2 border h-[250px] border-gray-300 rounded"
                required
              ></textarea>
            </div>

            <button
              disabled={!name || !email || !cateLogueName || loading}
              onClick={handleSubmit}
              className="btn btn-secondary"
            >
              Send{" "}
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}{" "}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
