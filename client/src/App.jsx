import React, { Fragment } from 'react'
import {Routes,Route} from "react-router-dom"

import Login from "./components/login/Login"

import AuthControl from './components/AuthControl'
import Home from "./components/home/Home"
import Users from "./components/Users"
import UserDetails from './components/UserDetails'
import Todos from "./components/Todos"
import Posts from "./components/Posts"
import Albums from "./components/Albums"
import Photos from "./components/Photos"
import Logout from "./components/Logout"

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route element={<AuthControl/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/users' element={<Users/>} >
              <Route path=':id' element={<UserDetails/>}/>
          </Route>
          <Route path='/todos' element={<Todos/>}/>
          <Route path='/posts' element={<Posts/>}/>
          <Route path='/albums' element={<Albums/>}/>
          <Route path='/photos' element={<Photos/>}/>
          <Route path='/logout' element={<Logout/>}/>
          <Route path='*' element={<Home/>}/>
        </Route>
        
      </Routes>
    </>
  )
}

export default App