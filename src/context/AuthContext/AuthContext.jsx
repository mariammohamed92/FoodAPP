/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import React from "react";
export let AuthContext = createContext(null);
export function AuthContextProvider(props) {
    let requestHeaders= {Authorization:`Bearer ${localStorage.getItem('token')}`};
    let baseUrl= `https://upskilling-egypt.com:3006/api/v1`;

  let [loginData,setLoginData]=useState(null)
  let savaLoginData=()=>{
    let encodedToken=localStorage.getItem('token');
    let decodedToken= jwtDecode(encodedToken);
    setLoginData(decodedToken);
    console.log(decodedToken);
  }

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      savaLoginData()
    }
  },[])

  return <>
<AuthContext.Provider value={{baseUrl,requestHeaders,loginData,savaLoginData}}>
        {props.children}
    </AuthContext.Provider>
</>
  
  
}
