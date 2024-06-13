/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import logo from '../../../../assets/img/logo.png';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function ChangePass({logout}) {
  let{baseUrl,requestHeaders}=useContext(AuthContext)



  const [loadingBtn, setloadingBtn] = useState(false);

    // showPassword
const [showPassword, setShowPassword] = useState(false);
const [showNewPasswor, setshowNewPasswor] = useState(false);
const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
// Error
const [massageError, setmassageError] = useState("");

const togglePasswordVisibility = () => {
  setShowPassword((prevState) => !prevState);
};

const toggleNewPassword = () => {
  setshowNewPasswor((prevState) => !prevState);
};

const togglePasswordVisibilityconfirm = () => {
  setShowPasswordConfirm((prevState) => !prevState);
};

  let{
    register,
     handleSubmit, 
     formState : {errors},
    }=useForm();
    const onSubmit= async (data)=>{
      console.log(data);
      setloadingBtn(true);
      if (data.newPassword === data.confirmNewPassword){
      try{
        let response = await axios.put(
          `${baseUrl}/Users/ChangePassword`,
        data,
        {
          headers:requestHeaders,
        }
      );
      logout();
        // console.log(response.data.message);
        toast.success(response.data.message);

      }catch(error){
        console.log(error);
toast.error(error.response.data.message);
      }  
    }  
    else {
      setmassageError("Your New Password Don't Equal Your Confirm Password ");
      setloadingBtn(false);

    }

    }
  return<>
   <div className="container-fluid  ">
      <div className="row  justify-content-center align-items-center">
          <div className="col-md-12 ">
            {/* Logo img */}
          <div className='text-center p-4 rounded rounded-5  '>
          <img src={logo} alt="" className='w-100' />
          </div>
          <div className="form-content container px-5">
            <h3> Change Your Password</h3>
            <p className=' text-muted'>Enter your details below</p>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>

{/* Old Password */}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  </span>
  <input type={showPassword ? "text" : "password"}
   className="form-control" 
   placeholder=" Old Password"
   {...register("oldPassword",{
    required:"Old Password is required",
  }

)}
   />
     <span className="input-group-text" id="basic-addon1">
    <i
                  className={`fa-regular fa-eye${showPassword ? "-slash" : ""}`}
                  onClick={togglePasswordVisibility}
                ></i>
                </span>
</div>

{errors.oldPassword&&<p className=' alert alert-danger'>{errors.oldPassword.message}</p>}

{/* New Password*/}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  </span>
  <input type={showNewPasswor ? "text" : "password"}
   className="form-control" 
   placeholder=" New Password"
   {...register("newPassword",{
    required:"New Password is required",
  }

)}
   />
     <span className="input-group-text" id="basic-addon1">
    <i
                  className={`fa-regular fa-eye${showNewPasswor ? "-slash" : ""}`}
                  onClick={toggleNewPassword}
                ></i>
                </span>
</div>
{errors.newPassword&&<p className=' alert alert-danger'>{errors.newPassword.message}</p>}

{/* Confirm New Password*/}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  </span>
  <input type={showPasswordConfirm ? "text" : "password"}
   className="form-control" 
   placeholder="Confirm New Password"
   {...register("confirmNewPassword",{
    required:"Confirm New Password is required",
  }

)}

   />
  <span className="input-group-text" id="basic-addon1">
    <i
                  className={`fa-regular fa-eye${showPasswordConfirm ? "-slash" : ""}`}
                  onClick={togglePasswordVisibilityconfirm}
                ></i>
                </span>
</div>
{errors.confirmNewPassword&&<p className=' alert alert-danger'>{errors.confirmNewPassword.message}</p>}
{massageError ? (
                <div className=" alert alert-danger"> {massageError}</div>
              ) : (
                ""
              )}

{/* button */}
<button className=' btn btn-success w-100 mb-5 ' >
{loadingBtn ? (
                  <BallTriangle
                    visible={true}
                    height="20"
                    width="700"
                    color="white"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  "Change Password"
                )}
</button>
</form>
          </div>
      </div>
    </div>
    </div>
  
  
  </>
}


