/* eslint-disable no-unused-vars */
import { NavLink} from 'react-router-dom';
import logo from '../../../../assets/img/logo.svg'
import React from 'react';

export default function NotFound() {
 
  return <>
 
      <div className="container-fluid">
  <div className="row">
 <div className="Notfound">
 <img src={logo} className='mt-5 w-25 mb-5'  alt="" />
  <div className="notfound  ms-5 ">
  <h1 className="NotHeading ">Oops</h1>
<p className="NotPrag ">Page  not found </p>
<p className="NotPrag1 ">This Page doesn’t exist or was removed!<br/>
            We suggest you  back to home. </p>
    <NavLink to="/dashboard">
      <button className=' btn btn-success text-white p-3' ><i className="fa-solid fa-arrow-left pe-2"></i>Back To Home</button>
   </NavLink>

  </div>
 </div>
  </div>
  
</div>

  </>
   
  
}


