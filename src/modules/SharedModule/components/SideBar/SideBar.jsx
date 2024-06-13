/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import toggler from '../../../../assets/img/3.png';
import Modal from 'react-bootstrap/Modal';
import ChangePass from '../../../AuthenticationModule/components/ChangePass/ChangePass';
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";


export default function SideBar() {
  let{loginData}=useContext(AuthContext)

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

const [isCollapsed,setIsCollapse]=useState(false)
const toggleCollapsed=()=>{
  setIsCollapse(!isCollapsed);
}
  const navigate=useNavigate()

  const Logout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  };


   
  return <>
    <Modal show={show} onHide={handleClose}>
       
        <Modal.Body>
       <ChangePass logout={Logout}/>
        </Modal.Body>
      </Modal>
      <div className=' sidebar-container'>
        <Sidebar collapsed={isCollapsed}>
  <Menu >
        <MenuItem className=' pt-5' onClick={toggleCollapsed} icon={<img src={toggler} className='ps-2'/>}  >  </MenuItem>
    {/* Home */}
    <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />} className='pt-5' > Home </MenuItem>
    {/* Users  */}
        {loginData?.userGroup == "SuperAdmin"?(
    <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/user" />}> Users </MenuItem>
  ):("")}

{/* Recipes */}
    <MenuItem icon={<i className="fa-solid fa-table-cells-large"></i>} component={<Link to="/dashboard/recipes" />}> Recipes </MenuItem>
    {/* Favorites */}
    {loginData?.userGroup == "SystemUser"?(
    <MenuItem icon={<i className="fa-regular fa-heart"></i>} component={<Link to="/dashboard/favs" />}> Favorites </MenuItem>
  ):("")}
  {/* Categories */}
    {loginData?.userGroup == "SuperAdmin"?(
    <MenuItem icon={<i className="fa-solid fa-layer-group"></i>} component={<Link to="/dashboard/categories" />}> Categories </MenuItem>
  ):("")}
  {/*  Change Password*/}
    <MenuItem onClick={handleShow} icon={<i className="fa-solid fa-lock-open"></i>}> Change Password </MenuItem>
    {/* Logout */}
    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={Logout} > LogOut </MenuItem>

  </Menu>
</Sidebar>
</div>
  </>

}
