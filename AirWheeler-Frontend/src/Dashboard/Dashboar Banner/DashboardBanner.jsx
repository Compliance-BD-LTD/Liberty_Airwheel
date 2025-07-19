import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Swal from 'sweetalert2';
import { UploadBanner } from '../Upload Banner/UploadBanner';
import { useOutletContext } from 'react-router';
import axios from 'axios';

export const DashboardBanner = () => {

    const { banners, setBanners } = useOutletContext()

    const handleDelete = (id) => {
        Swal.fire({
            title: "Do you want to delete it?",
            showCancelButton: true,
            confirmButtonText: "Delete",
            confirmButtonColor: '#FF0000'

        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {


                axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteBanner`, { data: { id: id } })
                    .then((res) => {

                        if (res.status == 200) {
                            setBanners(res.data.data)
                            Swal.fire("Delete", res.data.message, "success");
                        }


                    })
                    .catch((error) => Swal.fire("Something Wrong", error.message, "error"))





            }
        });
    }
    return (
        <div className='space-y-1 w-full'>
            <div>
                <h1 className='text-center md:text-5xl text-3xl font-bold text-gray-800 underline'>Banners</h1>

            </div>

            <br />
            <section className='space-y-4 px-5'>
                <div className='flex max-sm:justify-center max-sm:items-center '>
                    <label htmlFor="uploadBanner" className='btn text-base font-semibold hover:bg-cyan-400 bg-cyan-500 rounded-md text-white '>
                        Upload Banners <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                    </label>

                </div>

                <section className='flex max-sm:flex-col items-center md:flex-wrap md:space-x-5'>
                    {
                        banners && banners.map((item, index) => {
                            return (
                                <div key={index} className="group relative w-[300px] h-[200px] overflow-hidden shadow-lg  space-y-2 rounded-lg">
                                    <img
                                        src={`${item?.imageUrl[0] || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`}`}
                                        alt=""
                                        loading="lazy"
                                        className="w-full h-full rounded-lg max-sm:w-full object-cover hover:scale-105 transition-all duration-150 ease-in-out delay-110 cursor-pointer"
                                    />
                                    <div className="modal-action absolute right-2 rounded-full w-5 h-5 flex items-center justify-center bg-white -top-5" onClick={() => handleDelete(item._id)}>
                                        {/* <label htmlFor="uploadLogo" ><FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon></label> */}
                                        <FontAwesomeIcon icon={faXmark} size='lg' className='cursor-pointer' ></FontAwesomeIcon>
                                    </div>


                                </div>
                            )
                        })
                    }
                </section>
            </section>





            <UploadBanner></UploadBanner>
        </div>
    )
}
