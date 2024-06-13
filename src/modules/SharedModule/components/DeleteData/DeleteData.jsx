/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import noData from '../../../../assets/img/no-data.png'

export default function DeleteData({deleteItem}) {
  return <>
    <div className=' text-center '>
    <img src={noData} alt="" />
    <h5>Delete This {deleteItem}</h5>
    <p>are you sure you want to delete this item ? if you are sure just<br/> click on delete it</p>
  </div>

  
  
  </>
}
