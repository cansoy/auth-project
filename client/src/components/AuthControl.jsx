import React, { useContext, useEffect, useRef } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import useRefresh from '../hooks/useRefresh'
import {useCookies} from "react-cookie"

const AuthControl = () => {
    const [cookie,setCookie]=useCookies()
    const {loggeduser}=useContext(AuthContext)

  return (
    <>
      {loggeduser.username || cookie.clientCookie ? (<Outlet/>):(<Navigate to={"/login"}/>)}
    </>
  )
}

export default AuthControl