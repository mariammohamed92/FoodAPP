// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import logo from '../../../../assets/img/logo.png';
import { useForm} from 'react-hook-form';
import { NavLink ,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BallTriangle } from "react-loader-spinner";
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function Register() {
  let{baseUrl}=useContext(AuthContext)

  
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const togglePasswordVisibilityconfirm = () => {
    setShowPasswordConfirm((prevState) => !prevState);
  };
  const navigate=useNavigate();
// upload img
  const [fileInputContent, setFileInputContent] = useState(
    "Drag & Drop or Choose a Item Image to Upload"
  );
  const handleInputContent = () => {
    setFileInputContent("File Uploaded Successfully");
  };

  let{
    register,
     handleSubmit, 
     formState : {errors},
     getValues,
    }=useForm();

    const appendToFormData=(data)=>{
      const formData=new FormData();
      formData.append('userName',data.userName);
      formData.append('email',data.email);
      formData.append('country',data.country);
      formData.append('phoneNumber',data.phoneNumber);
      formData.append('password',data.password);
      formData.append('confirmPassword',data.confirmPassword);
      formData.append('profileImage',data.profileImage[0]);
      return formData;

    }

    const onSubmit= async (data)=>{
      setLoadingBtn(true);
      let registerFormData=appendToFormData(data)
      try{
        let response = await axios.post(
          `${baseUrl}/Users/Register`,
          registerFormData
      );
      console.log(response);
        toast.success(response.data.message);
        navigate("/verifyaccount")

      }catch(error){
        console.log(error);
toast.error(error.response.data.message);
      }
      setLoadingBtn(false);

    }

 // for useName
 const validateUserName = (value) => {
  // Check if the username has at least 4 characters
  if (value.length < 4) {
    return "The userName must be at least 4 characters.";
  }
  // Check if The userName must contain characters and end with numbers without spaces.
  const pattern = /^[a-zA-Z]+\d+$/;
  if (!pattern.test(value)) {
    return "The userName must contain characters and end with numbers without spaces.";
  }
  return true;
};
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
            <h3>Register</h3>
            <p className=' text-muted'>
            Welcome Back! Please enter your details
            </p>
            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/*1)UserName & Email */}
            <div className="row">
              {/* User Name */}
            <div className="col-md-6">
              <div className="input-group mb-1">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-regular fa-user"></i>  
  </span>
  <input type="text"
   className="form-control"
    placeholder="UserName" 
    {...register("userName", {
      required: "userName is required",
      validate: validateUserName,
    })}
    />
</div>
{errors.userName&&<p className=' alert alert-danger p-2'>{errors.userName.message}</p>}
              </div>
             {/* Email */}
              <div className="col-md-6">
              <div className="input-group mb-1">
  <span className="input-group-text" id="basic-addon1">
<i className='fa fa-envelope'></i>
  </span>
  <input type="email"
   className="form-control"
    placeholder="Enter your E-mail" 
    {...register("email", {
      required: "Email Address is required",
      pattern: {
        value:
          /[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com/,
        message: "Email Not vaild",
      },
    })}
/>
</div>
{errors.email&&<p className=' alert alert-danger p-2'>{errors.email.message}</p>}


              </div>
              </div>
              {/* 2)Country & Phone */}
              <div className="row">
              {/* Country */}
            <div className="col-md-6">
              <div className="input-group mb-1">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-globe"></i> 
   </span>
  <input type="text"
   className="form-control"
    placeholder="Country" 
    {...register("country", {
      required: "country is required ",
    })}
/>
</div>
{errors.country&&<p className=' alert alert-danger p-2'>{errors.country.message}</p>}
              </div>
             {/* Phone */}
              <div className="col-md-6">
              <div className="input-group mb-1">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-phone"></i>  
  </span>
  <input type="tel"
   className="form-control"
    placeholder="PhoneNumber" 
    {...register("phoneNumber", {
      required: "Phone Number is required",
      pattern: {},
    })}
/>
</div>
{errors.phoneNumber&&<p className=' alert alert-danger p-2'>{errors.phoneNumber.message}</p>}


              </div>
            </div>
              {/* 3)Password & confirm-password */}
              <div className="row">
              {/* Password */}
            <div className="col-md-6">
              <div className="input-group mb-1">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  
   </span>
  <input 
   className="form-control"
   type={showPassword ? "text" : "password"}
   placeholder="Password  "
   {...register("password", {
     required: "password is required ",
     validate: validatePassword,
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
{errors.password&&<p className=' alert alert-danger p-2'>{errors.password.message}</p>}
              </div>
             {/* confirm-password */}
              <div className="col-md-6">
              <div className="input-group mb-1">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-lock"></i>  
  </span>
  <input 
   className="form-control"
   type={showPasswordConfirm ? "text" : "password"}
   placeholder="Confirm Password"
   {...register("confirmPassword", {
     required: "Confirm Password is required",
     validate: validateConfirmPassword,
   })}
/>
<span className="input-group-text" id="basic-addon1">
<i
className={`fa-regular fa-eye${
showPasswordConfirm ? "-slash" : ""
}`}
onClick={togglePasswordVisibilityconfirm}
></i>
</span>
</div>
{errors.confirmPassword&&<p className=' alert alert-danger p-2'>{errors.confirmPassword.message}</p>}


              </div>
            </div>
            {/* 4)upload img */}
            <div className="row">
              {/* upload img */}
            {/* <div className="col-md-12">
              <div className="input-group mb-1 mt-1">
  <span className="input-group-text" id="basic-addon1">
  <i className="fa-solid fa-upload"></i>   
  </span>
  <input type="file"
   className="form-control"
    placeholder="profileImage" 
    {...register("profileImage",{
      required:"profileImage is required",
    }
  )}
    />
</div>
{errors.profileImage&&<p className=' alert alert-danger p-2'>{errors.profileImage.message}</p>}
</div> */}
                  <div className="mt-3">
                    <label htmlFor="uploadFile" className="file-lable">
                      <div className="d-flex w-100 flex-column  justify-content-center  align-items-center ">
                        <i className="fa fa-upload "></i>
                        <div className="m-2 fw-bold">{fileInputContent}</div>
                      </div>
                      <input
                        type="file"
                        accept=".jpg,.png"
                        id="uploadFile"
                        {...register("profileImage", {
                          required: "profileImage is Required",
                        })}
                        onChange={handleInputContent}
                      />
                    </label>
                  </div>
                  {errors.profileImage && (
                    <div className="text-danger mt-3">
                      {errors.profileImage.message}
                    </div>
                  )}

</div>
{/* Linkes */}
<div className="Linkes text-end my-3">
  <NavLink className=' text-success' to='/login'>Login Now ?</NavLink>
</div>

{/* button */}
<button className=' btn btn-success w-100 mb-5 ' >
{" "}
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
                        "Register"
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

