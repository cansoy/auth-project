import React, { useEffect } from 'react'
import useLogout from '../hooks/useLogout'
import { Navigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

const Logout = () => {
  const [cookies,setCookies]=useCookies()
  const {logout}=useLogout()
  
  return (
    <>
      {logout ? (<Navigate to={"/login"}/>):("")}
    </>
  )
}

export default Logout