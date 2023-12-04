import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

const useLogout = () => {
    const [logout,setLogout]=useState(false)
    const [clearcookies,setClearCookies]=useCookies()
    const [loading,setLoading]=useState(false)

    useEffect(()=>{
        fetch(`${import.meta.env.VITE_SERVER_PATH}/logout`,{credentials:"include"})
            .then(res=>{
                setLoading(true)
                return res.json()
            })
            .then(data=>{
                setClearCookies("clientCookie","clientCookie",{maxAge:0})
                setLoading(false)
                setLogout(true)
            })
    },[])

  return {logout}
}

export default useLogout