// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import logo from '../../../../assets/img/logo.png';
import { useForm} from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BallTriangle} from "react-loader-spinner";
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function ResetPass() {
  let{baseUrl}=useContext(AuthContext)

  const [loadingBtn, setloadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setshowPasswordConfirm] = useState(false);

    const navigate=useNavigate();
    let{
        register,
         handleSubmit, 
         formState : {errors},
         getValues
        }=useForm();

        const togglePasswordVisibility = () => {
          setShowPassword((prevState) => !prevState);
        };
      
        const togglePasswordConfirm = () => {
          setshowPasswordConfirm((prevState) => !prevState);
        };
      
        const onSubmit= async (data)=>{
          setloadingBtn(true);
            try{
              let response = await axios.post(`${baseUrl}/Users/Reset`,
              data);
              console.log(response.data);
              toast.success(response.data.message);
              navigate("/login")
      
            }catch(error){
      toast.error(error.response.data.message);
            }
            setloadingBtn(false);
          }
      // for password
const validatePassword = (value) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!pattern.test(value)) {
    return "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.";
  }

  return true;
};

// for ConfirmPassword

const validateConfirmPassword = (value) => {
  // console.log(value)
  const password = getValues("password");
  if (value !== password) {
    return "ConfirmPassword not match Password.";
  }
  return true;
};

    
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
            <h3> Reset  Password</h3>
            <p className=' text-muted'>Please Enter Your Otp  or Check Your Inbox</p>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
            <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
<i className='fa fa-envelope'></i>
  </span>
  <input type="email"
   className="form-control"
   placeholder=" E-mail"
   {...register("email", {
     required: "Email is required",
     pattern: {
       value: /[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com/,
       message: "Email Not vaild",
     },
   })}
/>
</div>
{errors.email&&<p className=' alert alert-danger'>{errors.email.message}</p>}

{/* OTP */}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  </span>
  <input type="text"
   className="form-control" 
   placeholder="OTP"
   {...register("seed",{
    required:"OTP is required",
    pattern:{
    message:"Invaild OTP"
    }
  }

)}
   />
</div>
{errors.seed&&<p className=' alert alert-danger'>{errors.seed.message}</p>}

{/* New Password */}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  </span>
  <input
   className="form-control"
   type={showPassword ? "text" : "password"}
   placeholder=" New Password"
   {...register("password",{
    required:"Password is required",
    validate: validatePassword,
  }
)}
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

{/* Confirm New Password*/}
<div className="input-group mb-5">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  </span>
  <input
   className="form-control" 
   type={showPasswordConfirm ? "text" : "password"}
   placeholder="Confirm New Password"
   {...register("confirmPassword", {
     required: "confirm Password is required",
     validate: validateConfirmPassword,

   })}
   />
<span className="input-group-text" id="basic-addon1">
   <i
className={`fa-regular fa-eye${
showPasswordConfirm ? "-slash" : ""
}`}
onClick={togglePasswordConfirm}
></i>
</span>
</div>
{errors.confirmPassword&&<p className=' alert alert-danger'>{errors.confirmPassword.message}</p>}

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
                        "Reset Password"
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
