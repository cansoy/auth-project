import React, { Fragment, useContext, useEffect, useState } from 'react'
import "./login.css"
import AuthContex from "../../contexts/AuthContext"
import {useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"

const Login = () => {
  const navigate=useNavigate()
  const {loggeduser,setLoggeduser}=useContext(AuthContex)
  const [username,setUsername]=useState("muhammed")
  const [password,setPassword]=useState("123456")
  const [logerr,setLogerr]=useState(null)
  const [cookie,setCookie]=useCookies()

  const [regusername,setRegUsername]=useState("muhammed")
  const [regemail,setRegemail]=useState("cansoy@hotmail.com")
  const [regpassword,setRegpassword]=useState("123456")
  const [regmsg,setRegmsg]=useState(null)

  const fncLoginInput=async(e)=>{
      const response=await fetch(`${import.meta.env.VITE_SERVER_PATH}/login`,
        {
          method:"POST",
          headers:{
                    "content-type":"application/json",
                    "x-custom-header-from-client":"x-custom-header-from-client"
                  },
          body:JSON.stringify({username:username,password:password}),
          credentials:"include"
        }
      )
      const data =await response.json()
      if (data.err) return setLogerr("Undefined User !")
      setLogerr(null)
      setLoggeduser({username:data.user.username,roles:data.user.roles})
      setCookie("clientCookie","clientCookie",{maxAge:1000*60*60*24*2})
      navigate("/")
  }

  const fncRegisterInput=async(e)=>{
    const response=await fetch(`${import.meta.env.VITE_SERVER_PATH}/register`,
      {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify({name:regusername,email:regemail,password:regpassword})
      })
      const data =await response.json()
      if (data.err) return setRegmsg(data.err)
      setRegmsg("Registered Well !")
      navigate("/login")
  }

  return (
    <div className='head-login'>
      <div className="bg"></div>
        <div className="panel">
        <input id="switch-open" type="radio" name="switch"/>
        <input id="switch-close" type="radio" name="switch"/>
        <div className="login">
          <h1 className='log-h1'>{logerr ? (logerr):("LOGIN")}</h1>
          <div className="group"><i className="fa fa-envelope" aria-hidden="true"></i>
            <input id="email" type="text" placeholder="E-Mail" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <label htmlFor="email"></label>
          </div>
          <div className="group"><i className="fa fa-unlock-alt" aria-hidden="true"></i>
            <input id="password" type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <label htmlFor="password"></label>
          </div>
          <input type="submit" value="LOGIN" onClick={fncLoginInput}/>
        </div>
        <div className="register">
          <label className="button-open" htmlFor="switch-open"></label>
          <label className="button-close" htmlFor="switch-close"></label>
          <div className="inner">
            <h1>REGISTER</h1>
            <p>{regmsg ?(regmsg):("")}</p>
            <div className="group"><i className="fa fa-user" aria-hidden="true"></i>
              <input id="name" type="text" placeholder="Name" value={regusername} onChange={(e)=>setRegUsername(e.target.value)}/>
              <label htmlFor="name"></label>
            </div>
            <div className="group"><i className="fa fa-envelope" aria-hidden="true"></i>
              <input id="email" type="text" placeholder="E-Mail" value={regemail} onChange={(e)=>setRegemail(e.target.value)}/>
              <label htmlFor="email"></label>
            </div>
            <div className="group"><i className="fa fa-unlock-alt" aria-hidden="true"></i>
              <input id="password" type="password" placeholder="Password" value={regpassword} onChange={(e)=>setRegpassword(e.target.value)}/>
              <label htmlFor="password"></label>
            </div>
            <input type="submit" value="REGISTER" onClick={fncRegisterInput}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login