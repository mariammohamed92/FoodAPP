/* eslint-disable no-unused-vars */
import  React, { useState } from 'react'
import logo from '../../../../assets/img/logo.png';
import { useForm} from 'react-hook-form';
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BallTriangle} from "react-loader-spinner";
import { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';


export default function Login() {
  let{baseUrl,savaLoginData}=useContext(AuthContext);
  const [loadingBtn, setLoadingBtn] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };


  const navigate=useNavigate();
  let{
    register,
     handleSubmit, 
     formState : {errors},
    }=useForm();

    const onSubmit= async (data)=>{
      setLoadingBtn(true);
      try{
        let response = await axios.post(`${baseUrl}/Users/Login`,
        data);
        localStorage.setItem('token',response.data.token);
        toast.success('Login Success',response.data.message);
        savaLoginData()
        navigate("/dashboard")

      }catch(error){

toast.error(error.response.data.message,'Login Fail');
      }
      setLoadingBtn(false);

    }
  return <>
  <div className="auth-container  ">
    <div className="container-fluid vh-100 bg-overlay">
      <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-md-6 bg-white ">
            {/* Logo img */}
          <div className='text-center p-4 rounded rounded-5  '>
          <img src={logo} alt="" className='w-50' />
          </div>
          <div className="form-content container px-5">
            <h3>Log In</h3>
            <p className=' text-muted'>Welcome Back! Please enter your details</p>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Email */}
            <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
<i className='fa fa-envelope'></i>
  </span>
  <input type="email"
   className="form-control"
    placeholder="Enter your E-mail" 
    {...register("email", {
      required: "Email Address is required",
      pattern: {
        value: /[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com/,
        message: "Email Not vaild",
      },
    })}

    />
</div>
{errors.email&&<p className=' alert alert-danger'>{errors.email.message}</p>}

{/* Password */}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  </span>
  <input type={showPassword ? "text" : "password"}
   className="form-control" 
   placeholder="Password"
 
    {...register("password", {
      required: "password is required ",
    
    })}   
    />
         <span className="input-group-text" id="basic-addon1">
       <i
                        className={`fa-regular fa-eye${
                          showPassword ? "-slash" : ""
                        }`}
                        onClick={togglePasswordVisibility}
                      ></i>
                      </span>
</div>
{errors.password&&<p className=' alert alert-danger'>{errors.password.message}</p>}

{/* Linkes */}
<div className="Linkes d-flex justify-content-between my-3">
  <NavLink className=' text-success' to='/register'>Register Now?</NavLink>
  <NavLink className=' text-success' to='/forgotpass'>Forgot Password?</NavLink>
</div>

{/* button */}
<button className=' btn btn-success w-100 mb-5 text-center' >
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
                        "Login"
                      )}

</button>
</form>
          </div>
          </div>
      </div>
    </div>
  </div>
  </>
}

