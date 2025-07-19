
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import banner from "../assets/image/Banner Image/Service page.png"
import { useOutletContext } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
export const SliderBanner = () => {

    const { banners } = useOutletContext()

    console.log('Bannersw',banners);
    

    const PrevArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute max-sm:hidden left-4 md:text-3xl text-2xl top-50/100 md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
        >
            <FontAwesomeIcon icon={faChevronLeft} size="2xl" ></FontAwesomeIcon>
        </button>
    );
    useEffect(() => {
        AOS.init({
            offset: 50
        });
    }, [])

    const NextArrow = ({ onClick }) => (
        <button
            onClick={onClick}
            className="absolute max-sm:hidden right-4 md:text-3xl text-2xl top-50/100   md:top-1/2 z-5 -translate-y-1/2  text-gray-400 cursor-pointer hover:text-gray-600"
        >
            <FontAwesomeIcon icon={faChevronRight} size="2xl" ></FontAwesomeIcon>
        </button>
    );
    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        autoplay: true,
        autoplaySpeed: 3500,
    };
    return (
        <div className="relative md:-mt-[50px] ">

            {
                banners.length == 0 ?
                    (
                        <div className="skeleton w-full h-[250px] md:h-screen"></div>
                    )
                    :

                    (
                        <Slider {...settings}>

                            {

                                banners.length > 1 ?
                                    banners.map((item, index) => {

                                        return (
                                            <div className="w-full bg-cyan-100 md:h-screen overflow-hidden "  key={index}>
                                                <img src={item.imageUrl[0]} className="w-full h-full    " alt="" />
                                            </div>
                                        )
                                    })
                                    :


                                    [1, 2].map((item, index) => {
                                        return (
                                            <div className="w-full bg-cyan-100 md:h-screen overflow-hidden " key={index}>
                                                <img src={banners[0].imageUrl[0] || `https://elomus-theme.myshopify.com/cdn/shop/files/slider2-elomus1-1920x900.jpg?crop=center&format=pjpg&height=900&v=1613722537&width=1920`} className="w-full h-full    " alt="" />
                                            </div>
                                        )
                                    })




                            }

                        </Slider>
                    )
            }





            <div  className="text-left w-3/4 text-black  md:w-[650px] md:space-y-5 absolute md:top-2/3 left-1/2 max-sm:bottom-0 md:left-1/3 transform -translate-x-1/2  -translate-y-1/2">
                <h1 data-aos='fade-right' data-aos-duration='1000'  className="md:text-4xl md:text-gray-800 text-cyan-500 text-xl font-bold "> <span className="max-sm:hidden ">Welcome to</span>  <span className="text-orange-500">Liberty</span>   <span className="text-orange-500">Air</span> <br /> <span className="text-cyan-500">Wheel</span></h1>
                <p data-aos='fade-left' data-aos-duration='1000' data-aos-placement="center-center" className="max-sm:hidden md:font-semibold text-gray-700  text-sm md:text-lg md:w-2/3  ">Experience next-generation mobility solutions engineered for performance and reliability. At Air Wheeler, we deliver advanced, efficient products to elevate your comfort and productivity, wherever you are..</p>
                <button data-aos='fade-up' data-aos-duration='1400' className="hidden font-semibold text-white hover:bg-cyan-400 transition-all duration-300 cursor-pointer px-10 py-3 rounded-l-full rounded-r-full border-2 border-cyan-500">Get Started</button>
            </div>
        </div>

    );
}
