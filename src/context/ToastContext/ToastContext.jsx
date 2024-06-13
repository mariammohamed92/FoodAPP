/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { createContext } from "react";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export let ToastContext =createContext(0);
export default function ToastContextProvider(props) {
    
    let getToastValue=(type,message)=>{

return toast[type](message,{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: 'Bounce',
        // eslint-disable-next-line no-dupe-keys
        closeOnClick: true


        });
        
    }
    return<>
            <ToastContext.Provider value={{getToastValue}}>
                {props.children}
        </ToastContext.Provider>
    

    </>
}