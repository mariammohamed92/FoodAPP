import React from 'react'
import  { useEffect, useState } from "react";
import userHeaderImg from "../../../../assets/img/header.png";
import Header from "../../../SharedModule/components/Header/Header";
import axios from "axios";
import NoData from "../../../SharedModule/components/NoData/NoData";
import noDataImg from "../../../../assets/img/no-data.png";
import Modal from "react-bootstrap/Modal";
import DeleteData from "../../../SharedModule/components/DeleteData/DeleteData";
import { toast } from "react-toastify";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";


export default function UsersList() {
  let{baseUrl,requestHeaders}=useContext(AuthContext)

  // modal for view

  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };


// Get User
const [usersList, setUsersList] = useState([]);

// Filteration
const [userName, setUserName] = useState("");
const [email, setEmail] = useState("");
const [country, setCountry] = useState("");
const [group, setGroup] = useState("");
// Pagenation
const [pageNumbers, setPageNumbers] = useState([]);

// Delete Data
const [showDelete, setDeleteShow] = useState(false);
const [userId, setUserId] = useState("");
const handleDeleteClose = () => setDeleteShow(false);
const handleDeleteShow = (id) => {
  setUserId(id);
  setDeleteShow(true);
}

const handleCloseDelete = () => {
setDeleteShow(false);
};

// Function Get User
const getUsersList = async (
userName,
email,
country,
groups,
pageSize ,
pageNumber
) => {

try {
  const response = await axios.get(
    `${baseUrl}/Users/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    {
      headers: requestHeaders,
      params: {
        userName: userName,
        email: email,
        country: country,
        groups: groups,
      },
    }
  );
  setPageNumbers(
    Array(response.data.totalNumberOfPages)
      .fill()
      .map((_, i) => i + 1)
  );
  setUsersList(response.data.data);
} catch (err) {
  console.log(err);
}
};
// Filteration
const getUserNameValue = (input) => {
setUserName(input.target.value);
getUsersList(input.target.value, email, country, group,30,1);
};
const getUserEmailValue = (input) => {
setEmail(input.target.value);
getUsersList(userName, input.target.value, country, group,30,1);
};
const getUserCountryValue = (input) => {
setCountry(input.target.value);
getUsersList(userName, email, input.target.value, group,30,1);
};
const getUserRole = (select) => {
console.log(select.target.value);
setGroup(select.target.value);
getUsersList(userName, email, country, select.target.value,30,1);
};

const onDeleteSubmit = async () => {
try {
  const response = await axios.delete(
    `${baseUrl}/Users/${userId}`,
    {
      headers: requestHeaders,
    }
  );
  console.log(response);
  handleCloseDelete()
  getUsersList();
  toast.success(response.data.message)
} catch (error) {
  toast.error(error.response.data.message)
  console.log(error.response.data.message);
  handleCloseDelete()
}
};
useEffect(() => {
getUsersList("", "", "", "", 40, 1);
}, []);

  return <>
     {/* Header */}
     <Header
        title={"Users List"}
        description={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={userHeaderImg}
      />
  {/* Modal for product view */}
                <div
        className={`modal fade ${showProductModal ? "show" : ""}`}
        id="productViewModal"
        tabIndex="-1"
        aria-labelledby="productViewModalLabel"
        aria-hidden={!showProductModal}
        style={{ display: showProductModal ? "block" : "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="productViewModalLabel">
                Product Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowProductModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <div className=" text-center mt-2">
              {selectedProduct.imagePath ?
        (
        <img className='imgrec rounded rounded-5 ' 
        src={'https://upskilling-egypt.com:3006/'+selectedProduct.imagePath} alt=""  />):(
      <img className=' imgrec' src={noDataImg} alt="no img"  />
    )}
                <h1 className=" text-success">{selectedProduct.userName}</h1>
                <h5 >{selectedProduct.email}</h5>
              <h5>{selectedProduct.phoneNumber}</h5>
              <h5>{selectedProduct.country}</h5>


                <p>{new Date(selectedProduct.creationDate).toLocaleDateString("en-GB")}</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-success"
                data-bs-dismiss="modal"
                onClick={() => setShowProductModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> 
      {/* Delete Data */}

<Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header >
          <h3>Delete Category</h3>
        </Modal.Header>
        <Modal.Body>
  <DeleteData deleteItem={'Category'}/>  
        </Modal.Body>
        <Modal.Footer >
        <Button variant="success" onClick={handleDeleteClose}>Cancel</Button>
    <Button variant="danger" onClick={onDeleteSubmit}>
          Delete this item         
            </Button>
        </Modal.Footer>

      </Modal>
          <div className="container-fluid mt-3 mb-2 px-4 w-100">
        <div className="d-flex flex-wrap justify-content-between  align-items-center ">
          <div>
            <h4>Users Table Details</h4>
            <p>You can check all details</p>
          </div>
       
        </div>
      </div>
      {/* Filteration */}
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search By userName"
              onChange={getUserNameValue}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search By email"
              onChange={getUserEmailValue}
            />
          </div>
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search By country"
              onChange={getUserCountryValue}
            />
          </div>
          <div className="col-md-3">
            <select
              name=""
              id=""
              className="form-select"
              onChange={getUserRole}
            >
              <option value="">User Role</option>
              <option value="1">admin</option>
              <option value="2">user</option>
            </select>
          </div>
        </div>
      </div>
      {/* Table */}
      <div className="table-responsive  px-3 border-none ">
        <table className="table align-middle mb-0 rounded p-5 w-100 table-borderless">
          <thead className=" text-white h-100  p-5">
        <tr>
        <th scope="col"  className=' bg-success-subtle ps-5  py-3'>#</th>
        <th scope="col"  className=' bg-success-subtle  py-3'>userName</th>
        <th scope="col"  className=' bg-success-subtle  py-3'>Image</th>
        <th scope="col"  className=' bg-success-subtle  py-3'>email</th>
        <th scope="col"  className=' bg-success-subtle  py-3'>Group</th>
        <th scope="col"  className=' bg-success-subtle  py-3'>Phone Number</th>
        <th scope="col"  className=' bg-success-subtle  py-3'>Country</th>
        <th scope="col"  className=' bg-success-subtle  py-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersList.length > 0 &&
              usersList.map((user,index) => (
                <tr key={user.index}>
                  <td scope="row" className=" ps-5">{index+1}</td>
                  <td>
                    <p className="fw-normal mb-1">{user.userName}</p>
                  </td>
                  <td className='conImg'>
                    {user.imagePath ? (
                      <img
                        className=" imgrec rounded rounded-5"
                        src={`https://upskilling-egypt.com:3006/${user.imagePath}`}
                        alt="user"
                      />
                    ) : (
                      <img
                        src={noDataImg}
                        className=' imgrec'
                        alt="No User"
                      />
                    )}
                  </td>
                  <td>
                    <p >{user.email}</p>
                  </td>
                  <td>
                    <p >{user.group.name}</p>
                  </td>
                  <td>
                        {user.phoneNumber != "undefined"
                          ? user.phoneNumber
                          : "No Phone"}
                  </td>
                  <td>
                 {user.country}
                  </td>

                  
                      {/* delete&view */}
                  <td>
      <div className="btn-group">
      <span type="button" data-bs-toggle="dropdown"aria-expanded="false">
              <i className="fa-solid fa-ellipsis "></i>
                </span>
            <ul className="dropdown-menu">
              {/* View */}
        <Link className=' text-decoration-none '>
            <span className="dropdown-item " onClick={() => handleViewProduct(user)}>
      <span className='  text-black border-0 '>
      <i className="fa-regular fa-eye text-success mx-2" aria-hidden="true"></i>
        View
</span>
</span>
</Link>
      {/* Delete */}
      <Link className=' text-decoration-none'>
      <span className="dropdown-item" onClick={()=>handleDeleteShow(user.id)}>
      <span className=' text-black border-0 '>
      <i className="fa fa-trash text-success mx-2"  aria-hidden="true"></i>
        Delete
</span>
</span>
</Link>
</ul>
</div>
    </td>
                </tr>
              ))}
          </tbody>
        </table>
        {usersList.length == 0 && <NoData />}
        <nav
          aria-label="Page navigation example "
          className=' justify-content-center d-flex  '>

          <ul className="pagination border border-success mt-3  overflow-y-auto">
            <li className="page-item border border-success fa-2x">
              <Link className="page-link " to="" aria-label="Previous">
                <span aria-hidden="true"  className=" text-success ">«</span>
              </Link>
            </li>
            {pageNumbers.map((pageNo, index) => (
              <li
                className="page-item border border-success fa-2x"
                key={index}
                onClick={() =>
                  getUsersList(userName, email, country, group, 40, pageNo)
                }
              >
                <Link className="page-link" to="">
                <span className=" text-success ">
                  {pageNo}
                  </span>
                  </Link>
              </li>
            ))}

            <li className="page-item  border border-success fa-2x">
              <Link className="page-link" to="" aria-label="Next">
                <span aria-hidden="true" className=" text-success">»</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  
}



  
