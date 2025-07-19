import React, { useContext, useEffect, useState } from 'react'

import AOS from 'aos';
import 'aos/dist/aos.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter, faMagnifyingGlass, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useLocation, useOutletContext } from 'react-router'
import { capitalizeWords } from '../Functions/functions'
import { ProductUpload } from '../Dashboard/FileUpload/ProductUpload'
import { ProductCard } from '../Product Card/ProductCard'
import Banner from "../assets/image/Banner Image/All Product Banner.jpg"
import { Searching } from '../Searching/Searching';

export const AllProducts = () => {
    const [limit, setLimit] = useState(6)
    const { products, categories } = useOutletContext()
    const [categoryFilter, setCategoryFilter] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    const [search, setSearch] = useState('')
    const [showFilter, setShowFilter] = useState(false)
    const location = useLocation()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (products != null) {
            setFilterProducts(products); // Load products into filterProducts when available
        }
    }, [products]);


    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 200);
        AOS.init({
            disable: 'mobile'
        });
    }, [])


    useEffect(() => {

        if (products) {
            const filter = products.filter((item) => {
                const searchLower = search.toLowerCase();

                // Define the keys to search in from the category
                const searchableKeys = ["model", "category", "release_date", "name", "rating"];

                // Check if any of the fields contain the search term
                return searchableKeys.some(key =>
                    item[key] && item[key].toString().toLowerCase().includes(searchLower)
                );
            });
            setFilterProducts(filter)
        }

    }, [search])

    useEffect(() => {
        if (products) {
            const filter = categoryFilter.length > 0 ?
                products.filter((item => categoryFilter.includes(item?.category.toLowerCase())))
                :
                products

            setFilterProducts(filter)

        }
    }, [categoryFilter])

    const handleCheck = (e) => {
        e.target.checked ? setCategoryFilter((prev) => [...prev, e.target.value]) : setCategoryFilter((prev) => [...prev].filter((item) => item != e.target.value))


    }



    return (


        <section  {
            ...(
                !location.pathname.startsWith('/dashboard') ? { 'data-aos': 'fade-up', 'data-aos-duration': '1000' }
                    : {}
            )


        } className='w-full'    >
            <div className={` md:h-[550px] w-full overflow-hidden ${location.pathname.startsWith('/dashboard') ? `mt-0` : `md:-mt-20`}    bg-cyan-500 `}>
                <img loading="lazy" src={Banner || `https://c4.wallpaperflare.com/wallpaper/416/765/276/facebook-cover-night-skyscrapers-city-wallpaper-preview.jpg`} className='h-[550px]  md:w-full max-sm:h-[220px] object-cover brightness-90 ' alt="" />
            </div>
            <Searching search={search} setSearch={setSearch} ></Searching>
            <div className={`max-w-[1340px] ${!location.pathname.startsWith('/dashboard') ? 'mx-auto' : 'px-3'}  space-y-5 bg- mb-20`}>






                <ProductUpload></ProductUpload>
                {
                    location.pathname.startsWith('/dashboard') &&
                    (
                        <div className='flex max-sm:justify-center max-sm:items-center '>
                            <label htmlFor="my_modal_4" className='btn text-base font-semibold hover:bg-cyan-400 bg-cyan-500 rounded-md text-white  '>
                                Add Products <FontAwesomeIcon icon={faPlus} ></FontAwesomeIcon>
                            </label>

                        </div>


                    )
                }


                <section className={`flex justify-center max-sm:items-center  max-sm:flex-col  max-sm:space-y-3 md:space-x-3  `}>
                    <div className='max-sm:hidden'>
                        <section className='border-2 border-cyan-200 w-[220px] space-y-3 p-4 rounded-lg shadow-lg '>

                            {
                                categories && categories.map((item, index) =>
                                (
                                    <div key={index} className='flex justify-between cursor-pointer'>

                                        <label className='font-semibold text-cyan-700'>{capitalizeWords(item?.name)}</label>
                                        <input type="checkbox" value={item?.name.toLowerCase()} onChange={handleCheck} className='toggle toggle-sm checked:text-cyan-500 checked:border-cyan-500 ' />
                                    </div>
                                ))
                            }


                        </section>
                    </div>





                    <section className='space-y-2 md:w-4/5 w-full '>
                        <div className='flex items-center flex-col md:hidden'  >

                            <div onClick={() => setShowFilter(!showFilter)} className="dropdown dropdown-end transition-all duration-300">
                                <div tabIndex={0} role="button" className="btn text-white bg-cyan-500  m-1 w-[150px] rounded-sm">Filter <FontAwesomeIcon icon={faFilter} ></FontAwesomeIcon></div>

                            </div>
                            {
                                showFilter &&
                                (
                                    <section className={`w-80/100 border-2 border-gray-200  transition-all duration-300 ease-in-out transform md:hidden  space-y-3 p-4 rounded-md shadow-lg my-5  ${showFilter ? `opacity-100 scale-100` : `opacity-0 scale-95 hidden`}`}>
                                        {
                                            categories && categories.map((item, index) =>
                                            (
                                                <div key={index} className='flex justify-between cursor-pointer'>

                                                    <label className='font-semibold text-cyan-700'>{capitalizeWords(item?.name)}</label>
                                                    <input type="checkbox" value={item?.name} onChange={handleCheck} className='toggle toggle-sm checked:text-cyan-600 checked:border-cyan-500 ' />
                                                </div>
                                            ))
                                        }

                                    </section>

                                )
                            }



                        </div>


                        {
                            products ?




                                filterProducts.length > 0 ?

                                    (
                                        <section className=' min-h-[300px] space-y-5'>

                                            {/* <div className='max-sm:hidden'>
                                                <a href="../../public/pdf/NT - 111 FS.pdf" className='btn m-1 w-[150px] text-white bg-cyan-500  rounded-sm'>Catelog</a>

                                            </div> */}
                                            <section className='flex justify-center items-center'>
                                                <div className={`grid grid-cols-1 ${location.pathname.startsWith('/dashboard') ? 'md:grid-cols-3 ' : 'md:grid-cols-4'} gap-3`}>



                                                    {filterProducts.slice(0, limit).map((item, index) => {
                                                        return (

                                                            <ProductCard key={index} item={item} ></ProductCard>



                                                        )
                                                    })
                                                    }
                                                </div>
                                            </section>

                                            <div className={`text-center ${limit >= filterProducts.length ? 'hidden' : ''} `}  >
                                                <button disabled={limit >= filterProducts.length} onClick={() => setLimit((prev) => prev + 6)} className={`btn ${limit >= filterProducts.length ? `text-gray-400` : `text-blue-700 hover:bg-blue-700 hover:text-white`}   rounded-md`}> Show More...</button>
                                            </div>
                                        </section>

                                    )
                                    :
                                    (
                                        <div className='h-screen'>
                                            <p className='font-bold text-center text-2xl mt-20'>No Product Available...</p>
                                        </div>


                                    )






                                :
                                (
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                                        {
                                            [1, 2, 3, 4, 5, 6].map((item, index) =>
                                            (
                                                <div key={index} className="skeleton h-[250px] w-[250px]"></div>
                                            ))

                                        }
                                    </div>
                                )



                        }




                    </section>

                </section>




            </div>
        </section>

    )
}




