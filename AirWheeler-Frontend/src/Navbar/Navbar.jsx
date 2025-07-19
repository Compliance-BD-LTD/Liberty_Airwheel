import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { capitalizeWords, urlConverter } from '../Functions/functions';
import { useDispatch, useSelector } from 'react-redux';
import { SideNavbar } from './SideNav/SideNavbar';
import logoo from "../assets/image/logo/Liberty Air Wheel Logo.png"
export const Navbar = ({ products, categories }) => {
    const [showMegaBar, setShowMegaBar] = useState(false);
    const megaBarRef = useRef(null);
    const categoriesBtnRef = useRef(null);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const logo = useSelector((state) => state.AirWheel.logo)
    const admin = useSelector((state) => state.AirWheel.users)
    const isDashboard = location.pathname.startsWith('/dashboard');
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 40 || location.pathname.startsWith('/dashboard')) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutsideMegaBar = megaBarRef.current && !megaBarRef.current.contains(event.target);
            const clickedOutsideButton = categoriesBtnRef.current && !categoriesBtnRef.current.contains(event.target);
            if (clickedOutsideMegaBar && clickedOutsideButton) {
                setShowMegaBar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Classes for navbar background and shadow
    let navbarClasses = `
        transition-all duration-500 backdrop-blur-xs bg-white/20
        ${scrolled || isDashboard ? 'fixed w-full    top-0 z-50 bg-white  text-cyan-500 shadow-lg' : 'bg-white  max-w-[1340px] rounded-lg'}
    `;

    const activeBorder = "border-b-2 border-cyan-500 ";
    const linkText = `${scrolled ? `text-black` : `text-black`}`

    return (
        <div className='relative z-10  ' >
            <nav className={` mx-auto md:h-[50px] max-sm:py-2  px-5 fixed w-full  backdrop-blur-xs  bg-cyan-400/10 

                `

            }>
                <div className='flex justify-between mx-auto items-center max-w-[1340px]'>


                    {/* Logo & Drawer */}
                    <div className="flex items-center justify-center space-x-4">
                        <div className="space-x-5 md:hidden">
                            {admin && isDashboard && (
                                <label
                                    htmlFor="dashboard-drawer"
                                    className="drawer-button text-cyan-500 text-xl lg:hidden"
                                >
                                    ☰
                                </label>
                            )}
                        </div>

                        <div className='cursor-pointer block' onClick={() => navigate('/')}>
                            {logo ?
                                // ? 
                                // <p className='text-3xl text-cyan-500 font-semibold'>Air <span className='text-orange-500'>Wheeler</span></p>

                                (
                                    <div className='w-[120px]'>
                                        <img src={logo} alt="" />
                                    </div>
                                )
                                : <div className='skeleton rounded-sm h-10'></div>
                            }
                        </div>
                    </div>
                    {/* End (Menu) */}
                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-md font-semibold">
                            <li className={`${linkText} ${location.pathname === "/" ? activeBorder : ""}`}>
                                <Link className={linkText} to="/">Home</Link>
                            </li>
                            <li>
                                <button
                                    ref={categoriesBtnRef}
                                    className={`relative cursor-pointer flex items-center gap-1 ${linkText}`}
                                    onClick={() => setShowMegaBar(!showMegaBar)}
                                >
                                    Products
                                    <FontAwesomeIcon
                                        icon={faChevronDown}
                                        className={`transition-transform duration-300 ${showMegaBar ? "rotate-180" : ""}`}
                                        style={{ fontSize: "0.85em" }}
                                    />
                                </button>
                            </li>
                            <li className={`${linkText} ${location.pathname === "/about" ? activeBorder : ""}`}>
                                <Link className={linkText} to="/about">About</Link>
                            </li>
                            <li className={`${linkText} ${location.pathname === "/services" ? activeBorder : ""}`}>
                                <Link className={linkText} to="/services">Services</Link>
                            </li>
                            <li className={`${linkText} ${location.pathname === "/blog" ? activeBorder : ""}`}>
                                <Link className={linkText} to="/blog">Blog</Link>
                            </li>
                            <li className={`${linkText} ${location.pathname === "/contact" ? activeBorder : ""}`}>
                                <Link className={linkText} to="/contact">Contact</Link>
                            </li>
                            {
                                admin && (
                                    <li className={`${linkText} ${location.pathname === "/dashboard" ? activeBorder : ""}`}>
                                        <Link className={linkText} to="/dashboard">Dashboard</Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>



                    <div className="space-x-5 md:hidden" >
                        <label htmlFor="navbar-drawer" className="drawer-button lg:hidden text-cyan-500 text-xl cursor-pointer">☰</label>
                    </div>

                </div>
                {/* MegaBar SideNavbar */}
                <SideNavbar categories={categories} />
            </nav>
            {showMegaBar && (
                <div
                    ref={megaBarRef}
                    className="bg-white/10 backdrop-blur-xs w-full transition-all duration-300 hidden md:block max-w-[1340px] mx-auto left-1/2 transform -translate-x-1/2 fixed top-[72px] shadow-2xl shadow-blue-300 rounded-lg z-50"
                >
                    <div className='flex justify-end p-2'>
                        <div
                            className='cursor-pointer hover:scale-105 text-blue-500 duration-300'
                            onClick={() => { setShowMegaBar(false); navigate('/all-products'); }}
                        >
                            View All Products
                        </div>
                    </div>
                    <section className="flex flex-wrap gap-5 p-5">
                        {categories && categories.map((item, index) => (
                            <div
                                key={index}
                                className='overflow-hidden group cursor-pointer flex flex-col items-center'
                                onClick={() => { setShowMegaBar(false); navigate(`/category/${urlConverter(item?.name)}`); }}
                            >
                                <img
                                    loading="lazy"
                                    src={item?.imageUrl || `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png`}
                                    className='w-[150px] group-hover:rotate-6 duration-200 transition-all rounded-md  object-cover mb-2'
                                    alt={item?.name}
                                />
                                <Link className="text-center text-cyan-950 font-semibold hover:underline w-full" to={`/category/${urlConverter(item?.name)}`}>
                                    {capitalizeWords(item?.name)}
                                </Link>
                            </div>
                        ))}
                    </section>
                </div>
            )}
            {/* Spacer so content below doesn't hide behind navbar */}
            <div className="h-[50px] z-0"></div>
        </div>
    );
};