/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from "react";

export default function Header({ title, description,description2, imgUrl }) {
  return (
    <>
      <div className='bgHeaderh container-fluid mt-3 p-3'>
        <div className=" row justify-content-between    ">
          <div className="  col-md-6 text-white  align-items-center px-5 pt-5">
            <div>
              <h2>{title}</h2>
              <p className="">{description} <br/>{description2}</p>
              

              
            </div>
          </div>

          <div className="col-md-6  text-end pe-5">
            <img className=" img-fluid" src={imgUrl} />
          </div>
        </div>
      </div>
     
    </>
  );
}
