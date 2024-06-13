/* eslint-disable no-unused-vars */
import  React, { useContext, useState } from 'react'
import logo from '../../../../assets/img/logo.png';
import { useForm} from 'react-hook-form';
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function VerifyAccount() {
  let{baseUrl}=useContext(AuthContext)

  const [loadingBtn, setloadingBtn] = useState(false);
    const navigate=useNavigate();
    let{
      register,
       handleSubmit, 
       formState : {errors},
      }=useForm();
  
      const onSubmit= async (data)=>{
        console.log(data);
        setloadingBtn(true);
        try{
          let response = await axios.put(
            `${baseUrl}/Users/verify`,
          data);
          toast.success(response.data.message);
          navigate("/login")
  
        }catch(error){
  toast.error(error.response.data.message);
        }
        setloadingBtn(false);

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
            <h3>Verify Account</h3>
            <p className=' text-muted'>Welcome Back! Please enter your details</p>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Email */}
            <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
<i className='fa fa-envelope'></i>
  </span>
  <input type="text"
   className="form-control"
    placeholder="Enter your E-mail" 
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

{/* Code */}
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-brands fa-codepen"></i>   
  </span>
  <input type="text"
   className="form-control" 
   placeholder="Code"
   {...register("code",{
    required:"code is required",
  }

)}
   />
</div>
{errors.code&&<p className=' alert alert-danger'>{errors.code.message}</p>}


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
                        "Submit"
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
