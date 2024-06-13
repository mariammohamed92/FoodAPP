// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import logo from '../../../../assets/img/logo.png';
import { useForm} from 'react-hook-form';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from '../../../../context/AuthContext/AuthContext';


export default function ForgetPass() {
  let{baseUrl}=useContext(AuthContext)

  const [loadingBtn, setloadingBtn] = useState(false);

    const navigate=useNavigate();
    let{
        register,
         handleSubmit, 
         formState : {errors},
        }=useForm();

        const onSubmit= async (data)=>{
          setloadingBtn(true);

            try{
                let response = await axios.post(`${baseUrl}/Users/Reset/Request`,
                data);
                console.log(response.data);
                toast.success(response.data.message);
                navigate("/resetpass")
              }catch(error){
                console.log(error);
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
            <h3>Forgot Your Password?</h3>
            <p className=' text-muted mb-5'>No worries! Please enter your email and we will send a password reset link </p>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email */}
            <div className="input-group mb-5">
  <span className="input-group-text" id="basic-addon1">
<i className='fa fa-envelope'></i>
  </span>
  <input type="text"
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
                          className=""
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