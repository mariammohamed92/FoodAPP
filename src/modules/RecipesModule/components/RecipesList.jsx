/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import Header from '../../SharedModule/components/Header/Header'
import Rescipesimg from "../../../assets/img/header.png"
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import NoData from '../../SharedModule/components/NoData/NoData';
import noData from '../../../assets/img/no-data.png'
import Modal from 'react-bootstrap/Modal';
import DeleteData from '../../SharedModule/components/DeleteData/DeleteData';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../context/AuthContext/AuthContext';
 
export default function RecipesList() {
  let{baseUrl,requestHeaders,loginData}=useContext(AuthContext)

    // modal for view

    const [showProductModal, setShowProductModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
  
    const handleViewProduct = (product) => {
      setSelectedProduct(product);
      setShowProductModal(true);
    };
  
  

  // Get Category
  const [categoriesList,setCategoriesList]=useState([]);
    // Get tages
const [tagsList,setTagsList]=useState([]);
  // Get recipes
  const[recipesList,setRecipesList]= useState([]);

// Filteration
  const[recipeName,setNameValue]=useState('');
  const[recipeTag,setTagValue]=useState('');
  const[recipeCat,setCatValue]=useState('');
// Pagenation
const[arrayOfPage,setArrayOfPage]=useState([])
// Navigate
const navigate=useNavigate()

// Delete Data
  const [showDelete, setDeleteShow] = useState(false);
  const [itemId,setItemId] = useState();
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id) => {
    setItemId(id)
    setDeleteShow(true);
  }
// loginData &LocalStorage& User||Admine
const[userData,setUserData]=useState(null)

// Favorite
const [ setShowReciepe] = useState(false);
const handleCloseReciepe = () => {
  setShowReciepe(false);

};
// add button in view Favorite
const addToFavorite = async (recipe) => {
  try {
    const addResponse = await axios.post(
      `${baseUrl}/userRecipe`,
      { recipeId: recipe.id },
      {
        headers: requestHeaders,
      }
    );
console.log(addResponse);
    toast.success("Recipe Added Successfully");
    handleCloseReciepe();
    navigate("/dashboard/favs");
  } catch (error) {
    console.log(error);
  }
};
// Data display Favorites
const getFavoritesList = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/userRecipe`,
      {
        headers: requestHeaders,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};


    // getRecipesList 
    const getRecipesList= async ( name,tagId,catId,pageSize,pageNumber )=>{
      try{
        let response = await axios.get(
          `${baseUrl}/Recipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
      {
        headers:requestHeaders,
        params:{
          name:name,
          tagId:tagId,
          categoryId:catId,
        },
      });
setArrayOfPage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));
if (loginData?.userGroup == "SystemUser") {
  let reciepesData = response.data.data;
  let favorites = await getFavoritesList();
  let favoritesData = favorites.data.data;

  let filtertedReciepes = reciepesData.filter((recipes) => {
    return favoritesData.every((favorite) => {
      return favorite.recipe.name !== recipes.name;
    });
  });

  setRecipesList(filtertedReciepes);
} else {
  setRecipesList(response.data.data);
}
      console.log(arrayOfPage);
     setRecipesList(response.data.data);
      }
      catch(error){
      console.log(error); 
      }
    }

    // Filteration
    const getNameValue=(input)=>{
      setNameValue(input.target.value)
    getRecipesList(input.target.value,recipeTag,recipeCat,3,1)
    
    }
    const getTagValue=(input)=>{
      setTagValue(input.target.value)
      getRecipesList(recipeName,input.target.value,recipeCat,3,1)
    }
      const getCategoryValue=(input)=>{
        setCatValue(input.target.value)
        getRecipesList(recipeName,recipeTag,input.target.value,3,1)
      }
    
    // Delete Item
    const onDeleteSubmit= async ()=>{
      try{
        let response = await axios.delete(
          `${baseUrl}/Recipe/${itemId}`,
        {
          headers:requestHeaders,
        }
      );
      handleDeleteClose()
      getRecipesList()
        console.log(response);
        // toast.success(response.data.message)
        toast.success('The Recipe Delete Successfully')

      }catch(error){
        // toast.error(error.response.data.message)
        toast.error('The Recipe Fail');
        console.log(error.response.data.message);
        handleDeleteClose()
  
      }

  }

  
const goToRecipeData=()=>{
  navigate('/dashboard/recipedata')
}


          // GetCategoriesList in Form
          const getCategoriesList= async ()=>{
            try{
              let response = await axios.get(
                `${baseUrl}/Category/?pageSize=10&pageNumber=1`,
            {
              headers:requestHeaders,
            });
            console.log(response.data.data);
            setCategoriesList(response.data.data);
            }
            catch(error){
            console.log(error); 
            }
          }
        
          // TagesList in Form 
          const getTagesList= async ()=>{
            try{
              let response = await axios.get(
                `${baseUrl}/tag`,
            {
              headers:requestHeaders,
            });
            console.log(response.data);
            setTagsList(response.data);
            }
            catch(error){
            console.log(error); 
            }
          }
        // Get Fav
        
            // GetCategoriesList &TagsList in Form callback
          useEffect(()=>{
            getRecipesList('','','',3,1);
            getCategoriesList();
            getTagesList();
            setUserData(JSON.parse(localStorage.getItem("userData")));
            if (loginData?.userGroup == "SystemUser") {
              getFavoritesList();
            }
        
          },[loginData])
        
  return  <>
  {/* Header */}
  <Header 
  title={'Recipes Items'}
  description={' You can now add your items that any user can order it from the Application and you can edit'}
  imgUrl={Rescipesimg}/>


{/* Delete Data */}
<Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header >
          <h3>Delete Recipes</h3>
        </Modal.Header>
        <Modal.Body>
  <DeleteData deleteItem={'Category'}/>  
        </Modal.Body>
        <Modal.Footer>
        <Button variant="success" onClick={handleDeleteClose}>Cancel</Button>
          <Button variant="danger" onClick={onDeleteSubmit}>
          Delete this item         
            </Button>
        </Modal.Footer>

      </Modal>
   
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
              <div className=" text-center ">
              {selectedProduct.imagePath ?
        (
        <img className='imgrec rounded rounded-5 ' 
        src={'https://upskilling-egypt.com:3006/'+selectedProduct.imagePath} alt=""  />):(
      <img className=' imgrec' src={noData} alt="no img"  />
    )}
              </div>
              <div className=" text-center mt-2">
                <h4 className=" text-success">{selectedProduct.name}</h4>
                <h6>{selectedProduct.price}</h6>
                <p>{selectedProduct.description}</p>
              </div>
            </div>
            <div className="modal-footer">
            {loginData?.userGroup == "SystemUser"?(
 <Link to={"/dashboard/favs"} 
 className=' text-decoration-none'
 >
<button
 className="btn btn-outline-dark ms-auto d-block"
 onClick={() => addToFavorite(selectedProduct)}
>
 Favorite
</button>
</Link>  ):("")}


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
      {/* </Modal> */}





{/*  */}




<div className="container-fluid p-4">
    <div className="row">
      <div className="col-md-6">
        <h4>Recipe Table Details</h4>
        <span>You can check all details</span>
      </div>
      <div className="col-md-6 d-flex justify-content-end">
      {loginData?.userGroup == "SuperAdmin"?(
        <button className=' btn btn-success p-2' onClick={goToRecipeData} >Add New Item</button>
  ):("")}

     </div>
    </div>
    <div className="filteration my-3">
      <div className="row">
        <div className="col-md-6">
          <input onChange={getNameValue} type="text" className=' form-control' placeholder='Search by recipe name'/>
        </div>
        <div className="col-md-3">
          <select className=' form-control' onChange={getCategoryValue}>
            <option value="" >Search by Category</option>
            {categoriesList?.map((cat) => (
            <option key={cat.id} value={cat.id} >
              {cat.name}
            </option>
                      ))}
          </select>
        </div>
        {/* Tag */}
        <div className="col-md-3">
          <select className=' form-control' onChange={getTagValue}>
            <option value="" >Search by Tag</option>
            {tagsList?.map((tag) => (
    <option key={tag.id} value={tag.id} >
      {tag.name}
    </option>
              ))}
                
          </select>
        </div>
        
      </div>
    </div>
    
<div className="table-responsive  px-3 border-none ">

<table className="table align-middle mb-0 rounded py-5 w-100 table-borderless">
  <thead className="bg-primary text-white  h-100 table-secondary py-5">
    <tr >
      <th scope="col"  className=' bg-success-subtle ps-5 py-3'>#</th>
      <th scope="col"  className=' bg-success-subtle  py-3'>Item Name</th>
      <th scope="col" className=' bg-success-subtle  py-3'>Image</th>
      <th scope="col" className=' bg-success-subtle  py-3'>Price</th>
      <th scope="col" className=' bg-success-subtle  py-3'>Description</th>
      <th scope="col" className=' bg-success-subtle  py-3'>Category</th>
      <th scope="col" className=' bg-success-subtle  py-3'>Tag</th>
      <th scope="col" className=' bg-success-subtle  py-3'>Action</th>
     

    </tr>
  </thead>
  <tbody>
    {recipesList.length>0&&recipesList.map((item,index)=>(
   <tr key={item.index}>
    <td scope="row" className=' ps-5'>{index+1}</td>
    <td>{item.name}</td>
    <td className='conImg'>{item.imagePath?(<img className='imgrec rounded rounded-5 ' src={'https://upskilling-egypt.com:3006/'+item.imagePath} alt=""  />):(
      <img className=' imgrec' src={noData} alt="no img"  />
    )}</td>
    <td>{item.price}</td>
    <td>{item.description}</td>
    <td>{item.category[0]?.name}</td>
    <td>{item.tag.name}</td>


{loginData?.userGroup == "SuperAdmin"?(
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
          <Link to={`/dashboard/recipeEdit/${item.id}`}
         className=' text-decoration-none'
         state={{recipeData:item,type:'edit'}}
         >
        <span className="dropdown-item"  >
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
):(
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

</ul>
</div>
</td>
)}
  </tr>

))}

  </tbody>
</table>
{recipesList.length == 0 && <NoData />}
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
     getRecipesList(recipeName,recipeTag,recipeCat,3,PageNo)}>
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
