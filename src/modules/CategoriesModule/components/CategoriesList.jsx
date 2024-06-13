/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from '../../SharedModule/components/Header/Header'
import Categoryimg from '../../../assets/img/header.png'
import React, {  useContext, useEffect, useState } from 'react'
import axios from 'axios';
import NoData from '../../SharedModule/components/NoData/NoData';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useForm} from 'react-hook-form';
import DeleteData from '../../SharedModule/components/DeleteData/DeleteData';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function CategoriesList() {

  // Update Location
  const location=useLocation();
  console.log(location);
  const state=location.state?.type==='edit';
  const categoryData=location.state?.categoryData;
// AuthContext
let{baseUrl,requestHeaders}=useContext(AuthContext);

    // modal for view

    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
  
    const handleViewProduct = (product) => {
      setSelectedProduct(product);
      setShowProductModal(true);
    };
  

  // Filteration
  const[cateName,setNameValue]=useState('');

  const getNameValue=(input)=>{
    setNameValue(input.target.value)
     getCategoriesList(input.target.value);

  }
  // Pagenation
  const[arrayOfPage,setArrayOfPage]=useState([])

// Add
  const [categoriesList,setCategoriesList]=useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);



  // Delete Data
  const [showDelete, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id) => {
    setItemId(id)
    setDeleteShow(true);
  }
  const [itemId,setItemId] = useState();

  let{
    register,
     handleSubmit, 
     formState : {errors},
    }=useForm();

    // Delete Item
    const onDeleteSubmit= async ()=>{

      try{
        let response = await axios.delete(
          `${baseUrl}/Category/${itemId}`,
        {
          headers:requestHeaders,
        }
      );
      handleDeleteClose()
      getCategoriesList()
        console.log(response);
        // toast.success(response.data.message)
        toast.success('The Category Delete Successfully')

      }catch(error){
        console.log(error);
        // toast.error(error.response.data.message)
        toast.error('The Category Fail');

      }

  }

    // Add New &&edit  > Form Name
    const onSubmit= async (data)=>{
      console.log(data);
        try{
          let response = await axios(
            {
              method:state?'put':'post',
              url:state ? `${baseUrl}/Category/${categoryData.id}`: `${baseUrl}/Category/`,
            data,
            headers:requestHeaders,

            }
        );
        handleClose()
        getCategoriesList()
          console.log(response);
          toast.success('The Category created Successfully');

        }catch(error){
          console.log(error);
          toast.error('The Category Fail');

        }
  }
  const getCategoriesList= async (name,pageSize,pageNumber)=>{
    try{
      let response = await axios.get(
        `${baseUrl}/Category/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
    {
      headers:requestHeaders,
      params:{
        name:name,
      },

    });
    setArrayOfPage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));
    setCategoriesList(response.data.data);
    }
    catch(error){
    console.log(error); 
    }
  }

  useEffect(()=>{
    getCategoriesList("",10,1)
  },[])

  return <>
  {/* Header */}
    <Header 
  title={'Categories Item'}
  description={'You can now add your items that any user can order it from the Application and you can edit'}
  imgUrl={Categoryimg}
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
                <h4 className=" text-success">{selectedProduct.name}</h4>
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
{/* Add New */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h3>Add Category</h3>
        </Modal.Header>
        <Modal.Body>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
{/* Name */}
<div className="input-group mb-3">
<input type="text"
className="form-control"
placeholder="Category Name " 
{...register("name",{
required:"Name is required",
})}
defaultValue={state?categoryData.name:""}
/>
</div>
{errors.name&&<p className=' alert alert-danger'>{errors.name.message}</p>}
          <button className='btn btn-success w-100'>
            Save 
          </button>
</form>    
        </Modal.Body>
      </Modal>


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
  <div className="container-fluid p-4">
    <div className="row">
      <div className="col-md-6">
        <h4>Categories Table Details</h4>
        <span>You can check all details</span>
      </div>
      <div className="col-md-6 d-flex justify-content-end">
<button className=' btn btn-success p-2' onClick={handleShow}>Add New Item</button>
      </div>
    </div>
   

    <div className="  container-fluid my-3">
      <div className="row">
        <div className="col-md-12">
          <input onChange={getNameValue} type="text" className=' form-control' placeholder='Search by Category name'/>
        </div>
      </div>
    </div>
<div className="table-responsive  px-3 border-none ">
 <table className="table align-middle mb-0 rounded py-5 w-100 table-borderless">
  <thead className="bg-primary text-white  h-100 table-secondary py-5">
    <tr>
      <th scope="col"  className=' bg-success-subtle ps-5  py-3'>#</th>
      <th scope="col"  className=' bg-success-subtle  py-3'>Category Name</th>
      <th scope="col"  className=' bg-success-subtle  py-3'>Creation Data</th>
      <th scope="col"  className=' bg-success-subtle  py-3'>Actions</th>
    </tr>
  </thead>
  <tbody>
                      
  {categoriesList.length>0&&categoriesList.map((item,index)=>(
    <tr key={item.id}>
    <th scope="row" className='ps-5'>{index+1}</th>
    <td>{item.name}</td>
    <td>
    <div className="d-flex align-items-center">
    <div className="ms-3">
     <p className=" mb-0">
{new Date(item.creationDate).toLocaleDateString("en-GB")}
  </p>
  </div>
   </div>
  </td>
   
    {/* delete&update&view */}
    <td>
      <div className="btn-group">
      <span type="button" data-bs-toggle="dropdown"aria-expanded="false">
              <i className="fa-solid fa-ellipsis "></i>
                </span>
            <ul className="dropdown-menu">
              {/* View */}
        <Link className=' text-decoration-none '>
            <span className="dropdown-item " onClick={() => handleViewProduct(item)}>
      <span className='  text-black border-0 '>
      <i className="fa-regular fa-eye text-success mx-2" aria-hidden="true"></i>
        View
</span>
</span>
</Link>
          {/* Edit */}
      <Link
            className=' text-decoration-none'
      state={{categoryData:item,type:'edit'}}
      >
     <span className="dropdown-item" onClick={()=>handleShow(item.id)} >
     <span className=' text-black border-0 '>
      <i className="fa fa-edit text-success mx-2"   aria-hidden="true"></i>
      Edit
      </span>
      </span>
      </Link>
      {/* Delete */}
      <Link className=' text-decoration-none'>
      <span className="dropdown-item" onClick={()=>handleDeleteShow(item.id)}>
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
{categoriesList.length == 0 && <NoData />}
 <nav aria-label="Page navigation example"
 className=' justify-content-center d-flex '
>
  <ul className="pagination border border-success mt-3">
    <li className="page-item border border-success fa-2x">
      <Link className="page-link " to="" aria-label="Previous">
        <span aria-hidden="true" className=" text-success ">«</span>
      </Link>
    </li>
    {arrayOfPage.map((PageNo,index)=>(
      <>
    <li className="page-item border border-success fa-2x"
    key={index}
     onClick={()=>
     getCategoriesList(cateName,10,PageNo)}>
      <Link className="page-link" to="">
        <span className=" text-success ">
        {PageNo}
        </span>
   </Link></li>
      </>
    ))}
    <li className="page-item border border-success fa-2x">
      <Link className="page-link" to="" aria-label="Next">
        <span aria-hidden="true" className=" text-success">»</span>
      </Link>
    </li>
  </ul>
</nav> 

</div>
  </div>

  
  </>
}

