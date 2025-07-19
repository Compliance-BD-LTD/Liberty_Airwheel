import React, { useEffect, useState } from 'react'
import { Navbar } from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

import { socket } from '../Socket/socket'
import axios from 'axios'
import { addLogo } from '../Redux/airwheel'
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { ScrollTop } from '../Custom Hooks/ScrollTop'
import { extractPublicId } from 'cloudinary-build-url'
import Footer from '../Footer/Footer'



export const Root = () => {


  const [products, setProducts] = useState(null)
  const [categories, setCategories] = useState(null)
  const [queries, setQueries] = useState([])
  const [banners, setBanners] = useState([])
  const [blogs, setBlogs] = useState([])
  const [services, setServices] = useState([])
  const [businessProducts, setBusinessProducts] = useState(null)
  const [certificate, setCertificate] = useState(null)
  const dispatch = useDispatch()
  const admin = useSelector((state) => state.AirWheel.users)
  useEffect(() => {
    AOS.init();
  }, [])
  const data = {
    products: products,
    categories: categories,
    setCategories: setCategories,
    setProducts: setProducts,
    queries: queries,
    setQueries: setQueries,
    banners: banners,
    setBanners: setBanners,
    blogs: blogs,
    setBlogs: setBlogs,
    services: services,
    setServices: setServices,
    businessProducts: businessProducts,
    setBusinessProducts: setBusinessProducts,
    certificate: certificate,
    setCertificate: setCertificate

  }

  useEffect(() => {


    if (admin && !socket.connected) {
      socket.emit('join')
    }
    socket.on('queries', (data) => {
      setQueries((prev) => [data.data, ...prev])

      toast.info('New Queries😱😱😱!!', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    })
    return () => {
      socket.off('queries')
    }

  }, [admin])


  useEffect(() => {
    socket.connect()
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getLogo`)
      .then((res) => {
        if (res.status == 200) {
          dispatch(addLogo((res.data.data)))
        }
      })
      .catch((err) => console.log(err))

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getBanners`)
      .then((res) => {
        if (res.status == 200) {

          setBanners(res.data.data)


        }
      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getBlogs`)
      .then((res) => {
        if (res.status == 200) {

          setBlogs(res.data.data)


        }
      })
      .catch((err) => console.log(err))
  }, [])

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getProducts`)
      .then((res) => {
        setProducts(res.data);





      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getServices`)
      .then((res) => {
        setServices(res.data.data)





      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCategories`)
      .then((res) => {
        setCategories(res.data)

      })
      .catch((err) => console.log(err))


    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getQueries`)
      .then((res) => setQueries(res.data.data))
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,

        });
      })

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getBusinessProducts`)
      .then((res) =>


        setBusinessProducts(res.data.data)
      )
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,

        });
      })

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getCertificate`)
      .then((res) =>


        setCertificate(res.data.data)
      )
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: err.message,

        });
      })



  }, [])
  const handleToast = () => {

    toast.info('New Queries😱😱😱!!', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }

  

  return (
    <div>

      <Navbar categories={categories}  ></Navbar>
      <ScrollTop></ScrollTop>
      <Outlet context={data}></Outlet>
      <Footer></Footer>
      <ToastContainer></ToastContainer>



    </div>
  )
}
