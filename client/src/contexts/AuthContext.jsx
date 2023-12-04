import React, { createContext, useState } from 'react'


const AuthContext = createContext()

export const AuthProvider=({children})=>{
    const [loggeduser,setLoggeduser]=useState({username:null,roles:null})
    const [accessToken,setAccessToken]=useState(null)
    const [userDb,setUserDb]=useState(null)

    return (
        <AuthContext.Provider value={{loggeduser,setLoggeduser,accessToken,setAccessToken,userDb,setUserDb}}>
                {children}
        </AuthContext.Provider>
    )
}

export default AuthContext