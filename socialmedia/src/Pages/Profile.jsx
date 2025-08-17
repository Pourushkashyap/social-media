import React from 'react'
import Userinfo from '../Components/User-info'
import { Outlet } from 'react-router-dom'
function Profile() {
  return (
   <>
   <Userinfo/>
   <Outlet/>
  </>
  )
}

export default Profile