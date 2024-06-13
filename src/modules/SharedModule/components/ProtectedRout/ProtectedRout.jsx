/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import {Navigate} from 'react-router-dom'

export default function ProtectedRoutes({children}) {

  if (localStorage.getItem("token")==null) {
    return <Navigate to={"/login"}/>
  }else{
    return children
  }
  
}


