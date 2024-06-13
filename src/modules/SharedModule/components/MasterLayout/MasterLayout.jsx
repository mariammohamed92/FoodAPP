// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar"
import SideBar from "../SideBar/SideBar"
import { Outlet } from "react-router-dom";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

function MasterLayout() {
  let{setLoginData,loginData}=useContext(AuthContext)

  return <>

    <div className="container-fluid p-0">
      <div className=" d-flex">
        <div>
        <SideBar  setLoginData={setLoginData} loginData={loginData}/>
      </div>

      <div className="w-100 overflow-y-auto vh-100 ">
          <Navbar loginData={loginData} />
          {/* <Header/> */}
          <Outlet/>
      </div>  
      </div>
    </div>
  </>
}

export default MasterLayout

