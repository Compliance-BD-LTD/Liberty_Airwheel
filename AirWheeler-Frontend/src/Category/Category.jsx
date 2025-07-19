import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useOutletContext, useParams } from 'react-router'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import axios from 'axios'
import { DynamicBanner } from '../Dynamic Banner/DynamicBanner'
import { urlReverter } from '../Functions/functions'
import { ProductCard } from '../Product Card/ProductCard'
import { Searching } from '../Searching/Searching'
export const Category = ({ url }) => {
  const { categoryName } = useParams()
  const [filterProducts, setFilterProducts] = useState(null)
  const category = urlReverter(categoryName)

  const [search, setSearch] = useState('')
  const [categoryItem, setCategoryItem] = useState(null)
  const [randomItem, setRandomItem] = useState(null)
  const { products, categories, setCategories } = useOutletContext()
  const admin = useSelector((state) => state.AirWheel.users)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (products && categories) {

      const filter_products = products.filter((item) => item?.category?.toLowerCase().includes(category?.toLowerCase()))

      if (filter_products) {
        setFilterProducts(filter_products)
      } else {
        setFilterProducts([])
      }

      const index = Math.floor(Math.random() * (filter_products.length - 1 - 0 + 1) + 0)
      setRandomItem(filter_products[index])
      const filterCategoryItem = categories.find((item) => item.name.toLowerCase() == category.toLowerCase())
      setCategoryItem(filterCategoryItem)
    }

  }, [products, categories, categoryName])
  const handleDelete = () => {


    if (categoryItem && categoryItem._id) {

      const data = {
        id: categoryItem._id
      }
      Swal.fire({
        title: "Do you want to Delete this?",
        showDenyButton: true,
        confirmButtonText: "Confirm Delete?",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {

          axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteCategory`, { data })
            .then((res) => {
              if (res.status == 200) {
                setCategories(res.data.data)
                Swal.fire(res.data.message, "success");
                navigate('/dashboard/categories')
              }
            })




        } else if (result.isDenied) {
          Swal.fire("Ok keep this Product", "", "info");
        }
      });
    } else {
      Swal.fire({
        title: "Not Found",
        icon: "error"
      })
    }


  }
  // useEffect(() => {
  //   window.scrollTo(0, 0); // Resets scroll position
  // }, []);


  const filtered_products = filterProducts && filterProducts.filter((item) => item.model.toLowerCase().includes(search.toLowerCase()))
  return (
    <div>

      <DynamicBanner 

        item={categoryItem}
      ></DynamicBanner>


      <Searching search={search} setSearch={setSearch}></Searching>

      <div className='max-w-[1340px] mx-auto space-y-5'>

        <section className='mx-auto my-5'>


          <section className='flex justify-center items-center'>

            {
              filterProducts && filterProducts.length == 0 && (
                <div className='min-h-[500px]'>
                  <p className='text-2xl font-bold text-gray-800'>No Products yet</p>
                </div>
              )
            }

            <div className='grid grid-cols-1 md:grid-cols-3 md:gap-10 gap-3 min-h-[500px]'>


              {

                filterProducts ?

                  filtered_products.map((item, index) => (
                    <ProductCard key={index} item={item} ></ProductCard>
                  ))



                  :

                  [1, 2, 3, 4, 5, 6].map((item, index) =>
                  (
                    <div key={index} className="skeleton h-[250px] w-[350px]"></div>
                  ))






              }


            </div>
          </section>

        </section>

      </div>
      {/* {
        admin && location.pathname.startsWith('/dashboard') &&
        (
          <div className='flex flex-row-reverse'>
            <div onClick={handleDelete} >
              <button className='btn btn-error px-3 py-2 rounded-lg'>Delete Category</button>
            </div>
          </div>
        )
      } */}












    </div>
  )
}
