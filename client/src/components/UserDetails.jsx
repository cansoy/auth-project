import React from 'react'
import { useParams,Navigate } from 'react-router-dom'
import useRefresh from '../hooks/useRefresh'

const UserDetails = () => {
  const {id}=useParams()
  const {err,loading,refresh}=useRefresh(`users/${id}`)
  return (
    <>
    {refresh.err ? (<Navigate to="/logout"/>):("")}
    <hr />
      <p>{id} User ID</p>
    <hr />
      {
        refresh.users ?
         (
          <ul>
            <li>{refresh.users.id}</li>
            <li>{refresh.users.name}</li>
            <li>{refresh.users.username}</li>
            <li>{refresh.users.email}</li>
            <li>{refresh.users.phone}</li>
            <li>{refresh.users.address.city}</li>
            <li>{refresh.users.address.street}</li>
            <li>{refresh.users.address.suite}</li>
          </ul>
         )
         :
         ("...")
      }
    <hr />
    </>
  )
}

export default UserDetails