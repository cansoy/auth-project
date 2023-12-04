import React, { useEffect, useRef } from 'react'
import useRefresh from '../hooks/useRefresh'
import {Navigate,Outlet,Link,useParams} from "react-router-dom"

const Users = () => {
  const {err,loading,refresh}=useRefresh("users")
  const {id}=useParams()

  return (
    <>
      {refresh.err ? (<Navigate to="/logout"/>):("")}
      <hr />
      <p>{err? (err):("")}</p>
      <hr />
      <p>{loading ?("Loading"):("")}</p>
      <hr />
      <p>Users Page!</p>
        {refresh.users ?
        (refresh.users.map (item=>{
          return <ul key={Math.random()}>
                      <li><Link to={`/users/${item.id}`}>More Detail !</Link></li>
                      <li>{item.name}</li>
                      <li>{item.username}</li>
                  </ul>
        })):
        ("Loading !")}
      <hr />
      <div className='users-outlet'> 
        <Outlet/>
      </div>
    </>
  )
}

export default Users