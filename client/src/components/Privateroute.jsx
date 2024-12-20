import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function Privateroute() {
  const { currentUser } = useSelector((state) => state.user)

  return <>
    {/* CAN ALSO WRITE CHILDREN INSTEAD OF OUTLET */}
    {currentUser ? <Outlet /> : <Navigate to='/signin' />}
  </>

}
