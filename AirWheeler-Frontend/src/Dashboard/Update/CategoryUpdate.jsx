import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router';
import Swal from 'sweetalert2';

export const UpdateCategory = ({ item }) => {
    const [imageFile, setImageFile] = useState(null)
    const [bannerFile, setBannerFile] = useState(null)
    const [name, setName] = useState('');
    const [imagePreview, setImagePreview] = useState([]); // 🔧 Shows either existing or new image
    const [bannerImage, setBannerImage] = useState([])
    const [loading, setLoading] = useState(false);
    const { setCategories } = useOutletContext();
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

    useEffect(() => {
        if (item) {
            setName(item.name || '');
            setImagePreview(item.imageUrl[0] || null); // 🔧 Show existing image on open
            setBannerImage(item.bannerImgUrl[0] || null)
            setBannerFile(null)
            setImageFile(null) // 🔧 Clear file selection when modal re-opens

        }
    }, [item]);

    // const handleFileChange = (e) => {
    //     const selectedFile = e.target.files[0];
    //     if (selectedFile) {
    //         setFile(selectedFile);
    //         setImagePreview(URL.createObjectURL(selectedFile)); // 🔧 Show new image
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            Swal.fire({ icon: "error", title: "Missing Name" });
            return;
        }

        const formData = new FormData();
        if (imageFile) formData.append('image', imageFile);
        if (bannerFile) formData.append('bannerImage', bannerFile); // 🔧 Only if new image selected
        formData.append('name', name);

        setLoading(true);


        try {
            const res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/updateCategory/${item._id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (res.status == 200) {
                Swal.fire({ icon: "success", title: "Updated Successfully" });
                setCategories(res.data.data)
            } else {
                Swal.fire({ icon: "error", title: "Error updating" });
            }


            // Reset after successful update
            handleModalClose()
        } catch (err) {
            Swal.fire({ icon: "error", title: "Error updating", text: err.message });
        } finally {
            setLoading(false);
        }
    };

    const handleModalClose = () => {
        // Reset state when modal closes
        setImageFile(null);
        setBannerFile(null)
        setName('');
        ImageFileInputRef.current.value = null
        BannerFileInputRef.current.value = null
    };

    if (!item) return null;

    return (
        <div>
            <input type="checkbox" id={`updateCategory-${item.name}`} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    {/* Close Button */}
                    <label
                        htmlFor={`updateCategory-${item.name}`}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={handleModalClose}
                    >
                        ✕
                    </label>

                    <section className="space-y-4">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-2 border-gray-300 rounded-lg p-2 w-full"
                            placeholder="Enter Category Name"
                        />

                        {/* Preview Image */}
                        <section className='flex space-x-10' >
                            <div>
                                <p className='font-semibold'>Category Image</p>
                                {imagePreview && (
                                    <div className="w-32 h-32 border rounded overflow-hidden">
                                        <img loading="lazy" src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className='font-semibold'>Category Banner</p>
                                {bannerImage && (
                                    <div className="w-32 h-32 border rounded overflow-hidden">
                                        <img loading="lazy" src={bannerImage} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>

                        </section>




                        {/* <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="border p-2 w-full"
                            accept="image/*"
                        /> */}

                        <section className='space-y-4'>
                            <div className='space-y-2'>


                                <div className='flex space-x-2 border-2 border-cyan-500 p-2 rounded-lg cursor-pointer'>
                                    <p className='font-semibold'>Category Image :</p>
                                    <input type="file" ref={ImageFileInputRef} id="img" name="img" onChange={(e) => handleFileChange(e, 'image')} className='borer-1 border-gray-200' accept="image/*" />
                                </div>

                                <div className='flex space-x-2 border-2 border-cyan-500 p-2 rounded-lg cursor-pointer'>
                                    <p className='font-semibold'>Banner Image : </p>
                                    <input type="file" ref={BannerFileInputRef} id="img" name="img" onChange={(e) => handleFileChange(e, 'bannerImage')} className='borer-1 border-gray-200' accept="image/*" />
                                </div>
                            </div>



                        </section>


                        <button onClick={handleSubmit} className="btn btn-secondary w-full">
                            Update {loading && <span className="loading loading-spinner loading-sm ml-2"></span>}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
};
