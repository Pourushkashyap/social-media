import React from 'react'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import { Outlet } from 'react-router-dom'
function Front() {
  return (
     <>
     <div className='flex'>
        <Navbar/>
        <Outlet/>
     </div>
    </>
  )
}

export default Front