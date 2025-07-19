import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';

export const ImageModal = () => {
    const [imageFile, setImageFile] = useState(null)
    const [bannerFile, setBannerFile] = useState(null)
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)

    const setCategories = useOutletContext().setCategories
    const ImageFileInputRef = useRef();
    const BannerFileInputRef = useRef()
    const handleFileChange = (e, v) => {
        const file = e.target.files[0];
        if (file) {

            const path = URL.createObjectURL(file)
            v == 'image' ? setImageFile(file) : setBannerFile(file)


        } else {
            Swal.fire({
                icon: "error",
                title: "Oops Image Couldnt Select...",
                text: "Something went wrong!",

            });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!imageFile || !name || !bannerFile) {
            Swal.fire({
                icon: "error",
                title: "Missing File or Name",
            });
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('bannerImage', bannerFile);  // ✅ Matches multer.single('image')
        formData.append('name', name);   // ✅ Must match req.body.name

        // Log form data to debug
        setLoading(true);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/addCategory`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            Swal.fire({
                icon: "success",
                title: "Uploaded Successfully",
            });

            setImageFile(null);
            setBannerFile(null)
            setName('');
            ImageFileInputRef.current.value = null
            BannerFileInputRef.current.value = null  // reset file input
            setCategories(res.data?.data);

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error uploading",
                text: err.message
            });
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        document.getElementById('my_modal_3').checked = false
        ImageFileInputRef.current.value = null
        BannerFileInputRef.current.value = null
        setBannerFile(null)
        setImageFile(null)



    }


    return (
        <div>
            <input type="checkbox" id="my_modal_3" className="modal-toggle" />

            {/* Modal Box */}
            <div className="modal">
                <div className="modal-box relative">
                    {/* Close Button */}
                    {/* <label htmlFor="my_modal_3" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </label> */}
                    <div onClick={handleClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </div>

                    <section className='space-y-4'>
                        <div className='space-y-2'>

                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='border-2 font-semibold border-gray-300 p-2  w-full rounded-lg' placeholder='Enter Category Name' id="" />
                            <div className='flex space-x-2 border-2 border-cyan-500 p-2 rounded-lg cursor-pointer'>
                                <p className='font-semibold'>Category Image :</p>
                                <input type="file" ref={ImageFileInputRef} id="img" name="img" onChange={(e) => handleFileChange(e, 'image')} className='borer-1 border-gray-200' accept="image/*" />
                            </div>

                            <div className='flex space-x-2 border-2 border-cyan-500 p-2 rounded-lg cursor-pointer'>
                                <p className='font-semibold'>Banner Image : </p>
                                <input type="file" ref={BannerFileInputRef} id="img" name="img" onChange={(e) => handleFileChange(e, 'bannerImage')} className='borer-1 border-gray-200' accept="image/*" />
                            </div>
                        </div>

                        <button disabled={(!name || !File || loading) && true} onClick={handleSubmit} className='btn btn-secondary'>Upload  {loading && <span className="loading loading-spinner loading-sm"></span>}  </button>

                    </section>




                </div>
            </div>
        </div>
    );
};
