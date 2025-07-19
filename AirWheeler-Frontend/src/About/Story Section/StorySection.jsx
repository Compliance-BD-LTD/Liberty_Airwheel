import React, { useEffect } from "react";
import { FaCheckCircle, FaPlayCircle } from "react-icons/fa";
import officeBuilding from "../../assets/image/Liberty Office Bulding.jpg"
import scooterImage from "../../assets/image/AboutImage.png"
import AOS from 'aos';
import 'aos/dist/aos.css';


const StorySection = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  return (
    <section className="w-full py-14 bg-gray-100">
      <div className="max-w-[1340px] mx-auto px-4">
        {/* History Section */}
        <div   className="flex flex-col md:gap-10 md:flex-row items-center mb-12">
          <div data-aos='fade-right' data-aos-duration="1500" className="w-full mb-8 md:mb-0">
            <img
              src={officeBuilding}
              alt="History"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div data-aos='fade-left' data-aos-duration="1500" className="w-full ">
            <h2 className="text-3xl font-bold text-cyan-500 mb-4">
              History of <span className="text-orange-500">Liberty Air Wheel</span>
            </h2>
            <p className="text-gray-700 text-base mb-6">
              Liberty Air Wheel was founded with the vision to create smart
              mobility products that revolutionize the way we travel. Our journey
              began with a simple goal: to offer innovative, reliable, and
              user-friendly products that make daily commutes and travel easier and
              more enjoyable. We strive to keep pushing the boundaries of design and
              technology, creating products like our electric scooters and smart
              luggage that seamlessly integrate into your fast-paced lifestyle.
            </p>
            <button className="text-cyan-500 cursor-pointer hover:bg-cyan-500 hover:text-white rounded-l-full rounded-r-full px-4 py-2  border-2 border-cyan-500 font-semibold transition duration-300">
              Read More
            </button>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="flex flex-col md:gap-10 md:flex-row-reverse items-center">
          <div data-aos='fade-up' data-aos-duration="1500" className="md:w-1/2 w-full mb-8 md:mb-0">
            <img
              src={scooterImage}
              alt="Why Choose Us"
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div data-aos='fade-down' data-aos-duration="1500" className="md:w-1/2  w-full">
            <h2 className="text-3xl font-bold text-cyan-500 mb-4">
              Why Choose <span className="text-orange-500">Liberty Air Wheel</span>?
            </h2>
            <p className="text-gray-700 text-base mb-6">
              At Liberty Air Wheel, we are committed to offering our customers
              products that are not only functional but also stylish and innovative.
              Our smart scooters, luggage, and mobility solutions are built with the
              highest quality standards and cutting-edge technology to deliver a
              seamless and enjoyable experience. We prioritize user experience, ease
              of use, and sustainable travel, making us the trusted choice for
              modern-day explorers.
            </p>
            <button className="text-cyan-500 cursor-pointer hover:bg-cyan-500 hover:text-white rounded-l-full rounded-r-full px-4 py-2  border-2 border-cyan-500 font-semibold transition duration-300">
              Read More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


export default StorySection;