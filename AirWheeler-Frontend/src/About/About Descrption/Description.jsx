import React, { useEffect } from "react";
import { FaRegCalendarAlt, FaRegSun, FaRegStar } from "react-icons/fa";
import { LuSun } from "react-icons/lu";
// import image from "../../assets/img/features-3-2.jpg"
import AOS from 'aos';
import 'aos/dist/aos.css';
import twoWheel from "../../assets/image/scooter/make-a-warehouse-for-airwheel-luggage-.jpg"

import { FaWarehouse, FaBoxes, FaTruckLoading, FaTools } from "react-icons/fa";

export const Description = () => {
    const warehouseFeatures = [
        {
            icon: <FaWarehouse className="text-cyan-500 text-3xl" />,
            title: "Smart Storage Solutions",
            desc: "Our warehouse is equipped to handle a wide range of products, including our innovative Air Wheel luggage and scooters. Every item is stored carefully to ensure smooth handling and quick dispatch.",
        },
        {
            icon: <FaBoxes className="text-cyan-500 text-3xl" />,
            title: "Diverse Product Range",
            desc: "From foldable Air Wheel luggage to high-performance electric scooters and two-wheeled standing machines, we offer a variety of solutions for urban mobility, ensuring there's something for everyone.",
        },
        {
            icon: <FaTruckLoading className="text-cyan-500 text-3xl" />,
            title: "Quick & Reliable Delivery",
            desc: "We understand the importance of timely delivery. Our efficient logistics system ensures that your products, including our latest electric scooters and luggage, arrive safely and on time.",
        },
        {
            icon: <FaTools className="text-cyan-500 text-3xl" />,
            title: "Rigorous Quality Control",
            desc: "All products undergo thorough checks for quality, performance, and safety. Whether it's a new scooter or Air Wheel luggage, we ensure you're receiving only the best for your daily travels and adventures.",
        },
    ];

    useEffect(() => {
        AOS.init();
    }, [])

    return (
        <section className="w-full bg-cyan-100 py-20 flex justify-center overflow-x-hidden">
            <div className="max-w-[1340px] flex  flex-col md:flex-row gap-10 items-center px-4 md:px-5">
                {/* Text Left */}
                <div className="w-full md:w-1/2" data-aos="fade-up-right"
                    data-aos-duration="1500">
                    <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-4">
                        Our Product Warehouse
                    </h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Our state-of-the-art warehouse is the heart of our operation, housing a vast selection of Air Wheel luggage, electric scooters, and two-wheeled standing machines. Every product is carefully organized and maintained to ensure prompt delivery and the highest quality for our customers. Discover how we bring efficiency and reliability to your daily travels.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                        {warehouseFeatures.map((f, i) => (
                            <div className="flex items-start gap-4" key={i}>
                                <div className="mt-1">{f.icon}</div>
                                <div>
                                    <div className="font-semibold text-gray-800">{f.title}</div>
                                    <div className="text-gray-600 text-sm">{f.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Image Right */}
                <div className="w-full h-[400px] bg-amber-300 md:w-1/2" data-aos="fade-up-left"
                    data-aos-duration="2000">
                    <img
                        src={twoWheel}
                        alt="Product Warehouse"
                        className="rounded-lg   w-full h-[500px]  object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
