/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import navlogo from '../../../../assets/img/avatar.png';
import React, { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

function Navbar() {
  let{loginData}=useContext(AuthContext)

  return <>
<nav className="navbar navbar-expand-lg navbar-light">
  <div className="container-fluid">
    <button className="navbar-toggler mb-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <form className="col-md-9 ">
   <input  className="form-control me-2" type="search"  placeholder="&#xf002;Search Here" aria-label="Search" />
      </form>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" href="#">
                <img src={navlogo} className=" pe-2"/>
              {loginData?.userName}
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link ">
        <i className="fa-solid fa-bell pt-2 ps-2 "></i>            
          </Link>
        </li>
      </ul>
     
    </div>
  </div>
</nav>

  </>
}

export default Navbar