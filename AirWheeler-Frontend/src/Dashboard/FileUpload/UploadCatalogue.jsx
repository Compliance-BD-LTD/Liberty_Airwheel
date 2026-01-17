import axios from "axios";
import React, { useRef, useState } from "react";
import { useOutletContext } from "react-router";
import Swal from "sweetalert2";
import { FaPlus, FaMinus } from "react-icons/fa";

export const UploadCatalogue = () => {
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setCatalogue } = useOutletContext();
  const ImageFileInputRef = useRef();
  const pdfFileInputRef = useRef();

  const handleFileChange = (e, v) => {
    const file = e.target.files[0];
    if (file) {
      const path = URL.createObjectURL(file);
      v === "image" ? setImageFile(file) : setPdfFile(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops Image/Pdf Couldn’t Select...",
        text: "Something went wrong!",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || !name) {
      Swal.fire({
        icon: "error",
        title: "Missing File or Name",
      });
      return;
    }

    const formData = new FormData();

    formData.append("image", imageFile);
    formData.append("pdf", pdfFile);
    formData.append("name", name);

    setLoading(true);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/addCatalogue`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status == 200) {
        Swal.fire({
          icon: "success",
          title: res.data.message,
        });
      }

      setImageFile(null);
      setPdfFile(null);
      setName("");

      ImageFileInputRef.current.value = null;
      pdfFileInputRef.current.value = null;

      setCatalogue(res.data?.data);
    } catch (err) {
      console.log("Error", err);

      Swal.fire({
        icon: "error",
        title: "Error uploading",
        text: err.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    document.getElementById("my_modal_6").checked = false;
    ImageFileInputRef.current.value = null;
    pdfFileInputRef.current.value = null;
    setPdfFile(null);
    setImageFile(null);
    setLoading(false);
  };
  return (
    <div>
      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <div
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </div>
          <p className="text-center font-semibold text-4xl my-5 ">
            Upload Catalogue
          </p>
          <section className="space-y-5">
            <div className="space-y-5">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-2 font-semibold border-gray-300 p-2 w-full rounded-lg"
                placeholder="Enter Catalogue Name"
              />

              <div className="flex space-x-2 border-2 border-cyan-500 p-2 rounded-lg cursor-pointer">
                <p className="font-semibold">Catalogue Cover Image :</p>
                <input
                  type="file"
                  ref={ImageFileInputRef}
                  onChange={(e) => handleFileChange(e, "image")}
                  className="border-1 border-gray-200"
                  accept="image/*"
                />
              </div>
              <div className="flex space-x-2 border-2 border-cyan-500 p-2 rounded-lg cursor-pointer">
                <p className="font-semibold">Catalogue PDF : </p>
                <input
                  type="file"
                  ref={pdfFileInputRef}
                  onChange={(e) => handleFileChange(e, "pdfFile")}
                  className="border-1 border-gray-200"
                  accept="application/pdf"
                />
              </div>

              {/* Dynamic Inputs */}
            </div>

            <button
              disabled={!name || !imageFile || loading}
              onClick={handleSubmit}
              className="btn btn-secondary"
            >
              Upload{" "}
              {loading && (
                <span className="loading loading-spinner loading-sm"></span>
              )}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
