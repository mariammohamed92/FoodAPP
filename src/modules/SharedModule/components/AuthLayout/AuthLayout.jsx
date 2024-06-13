/* eslint-disable no-unused-vars */
import React from "react"
import { Outlet } from "react-router-dom"

function AuthLayout() {
  return <>
  <Outlet/>
  </>
}

export default AuthLayout