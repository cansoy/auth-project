import React, { useEffect, useState } from 'react'

const useRefresh = (serverPath) => {
    const [err,setErr]=useState(null)
    const [loading,setLoading]=useState(true)
    const [refresh,setRefresh]=useState({data:null,err:null})

    useEffect(()=>{
        const controller=new AbortController()
        fetch(`${import.meta.env.VITE_SERVER_PATH}/${serverPath}`,{credentials:"include",signal:controller.signal})
            .then(res=>{
                if (res.status!==200)  setErr("Response Status Error Exist !")
                return res.json()
            })
            .then(data=>{
                setRefresh(data)
                setLoading(false)
            })
        
        return()=>{
            controller.abort()
        }
    },[serverPath])

    return {err,loading,refresh}
}

export default useRefresh