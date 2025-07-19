
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
// import banner from "../assets/img/page-title-bg.jpg"
import { useEffect, useState } from "react";
import { socket } from "../Socket/socket";
import Swal from "sweetalert2";
import AOS from 'aos';
import 'aos/dist/aos.css';
const ContactSection = () => {
    const [contact, setContact] = useState({
        name: '',
        email: '',
        subject: '',
        description: '',
        phone: '',
        type: 'contact'
    })
    const handleSubmit = () => {


        socket.emit('sendQueries', contact)
        setContact({
            name: '',
            email: '',
            subject: '',
            description: '',
            phone: '',
            type: 'quote'
        })
        Swal.fire({
            title: "Your Queries!",
            text: "Successfully Sent!",
            icon: "success"
        });


    }

    const handleChange = (e) => {
        setContact({ ...contact, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        AOS.init();
    }, [])
    return (
        <section   className="overflow-x-hidden" >
            {/* <div className="-mt-20 overflow-hidden h-[350px] relative">
                <img src={banner} className="brightness-50 h-[500px] bg-cover w-full" alt="" />

                <div className="text-center w-full max-w-[650px] space-y-10 absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 text-5xl text-white font-semibold">Contact</div>
            </div> */}
            {/* <div className='text-center mt-10'>
                <p className='text-3xl md:text-5xl font-semibold'>  <span className='text-cyan-500'>Contact</span>  </p>
            </div> */}

            <div className=" md:max-w-[1340px] mx-auto py-10">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
 
                    <div className="bg-white rounded shadow p-8 flex flex-col items-center">
                        <FaMapMarkerAlt className="text-cyan-500 text-5xl mb-2 border-2 border-dotted border-yellow-200 rounded-full p-2" />
                        <div className="text-lg font-semibold text-gray-700 mb-1">Address</div>
                        <div className="text-gray-500 text-center">
                            418 BROADWAY STE R
                            ALBANY NEW YORK 12207
                        </div>
                    </div>

                    <div className="bg-white rounded shadow p-8 flex flex-col items-center">
                        <FaPhoneAlt className="text-cyan-500 text-5xl mb-2 border-2 border-dotted border-yellow-200 rounded-full p-2" />
                        <div className="text-lg font-semibold text-gray-700 mb-1">Call Us</div>
                        <div className="text-gray-500 text-center"> +1 3322 5228 17
                        </div>
                    </div>

                    <div className="bg-white rounded shadow p-8 flex flex-col items-center">
                        <FaEnvelope className="text-cyan-500 text-5xl mb-2 border-2 border-dotted border-yellow-200 rounded-full p-2" />
                        <div className="text-lg font-semibold text-gray-700 mb-1">Email Us</div>
                        <div className="text-gray-500 text-center">info@libertyairwheel.com</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="bg-white rounded overflow-x-hidden shadow overflow-hidden" data-aos="fade-right"
                        data-aos-duration="1500" >
                        <iframe
                            title="Google Map"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.8580300176887!2d-74.01126448459207!3d40.71533717933062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a19da9b1b01%3A0x8e3f9d955b8ee0b3!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1681702113867!5m2!1sen!2sus"
                           
                            className="w-full h-[320px]"


                            loading="lazy"
                        ></iframe>
                    </div>

                    <div className="bg-white overflow-x-hidden rounded shadow p-8 flex flex-col space-y-5" data-aos="fade-left"
                        data-aos-duration="1500">
                        <div className="flex flex-col md:flex-row gap-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={contact.name}
                                name="name"
                                onChange={handleChange}
                                className="flex-1 border border-gray-300 rounded p-3 focus:outline-none focus:border-cyan-500"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={contact.email}
                                onChange={handleChange}
                                name="email"
                                className="flex-1 border border-gray-300 rounded p-3 focus:outline-none focus:border-cyan-500"
                            />
                        </div>
                        <input
                            type="text"
                            name='phone'
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
                            className="border border-gray-300 rounded p-3 focus:outline-none focus:border-cyan-500"
                        />
                        <textarea
                            placeholder="Message"
                            rows="5"
                            name="description"
                            value={contact.description}
                            onChange={handleChange}
                            className="border border-gray-300 rounded p-3 focus:outline-none focus:border-cyan-500 resize-none"
                        ></textarea>
                        <button
                            type="submit"
                            disabled={!contact.name && !contact.email && !contact.subject && !contact.description}
                            onClick={handleSubmit}
                            className={`  ${!contact.name || !contact.email || !contact.subject || !contact.description ? `bg-gray-400 cursor-not-allowed ` : `bg-cyan-500 hover:bg-cyan-400`}  text-white text-lg font-semibold rounded-full py-3 mt-2 transition`}
                        >
                            Send Message
                        </button>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;