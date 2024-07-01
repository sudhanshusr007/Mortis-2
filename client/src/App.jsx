import React, { useContext, useEffect } from "react";
import "./App.css"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Appointment from "./pages/Appointment"
import AboutUs from "./pages/AboutUs"
import Login from "./pages/Login"
import { ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Navbar from "./components/Navbar";
import { Context } from "./main";
import Footer from "./components/Footer";
import Register from './pages/Register'
import ApplicationStatus from "./pages/ApplicationStatus";

const App = () => {
  const{isAuthenticated,setIsAuthenticated,setUser}=useContext(Context);
  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const response=await axios.get("https://mortis-2.onrender.com/api/v1/user/patient/me",{withCredentials:true})
        setIsAuthenticated(true)
        setUser(response.data.user)
      } catch (error) {
        setIsAuthenticated(false)
        setUser({})
      }
    }
    fetchUser()
  },[isAuthenticated])
  return (
    <>
    <Router>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/appointment' element={<Appointment/>}/>
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/application-status" element={<ApplicationStatus />} />
      </Routes>
      <Footer/>
      <ToastContainer position="top-right"/>
    </Router>
    </>
  )
}

export default App