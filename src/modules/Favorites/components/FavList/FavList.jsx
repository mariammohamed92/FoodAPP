/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import  React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import reciepeHeaderImg from "../../../../assets/img/header.png";
import noDataImg from "../../../../assets/img/no-data.png";
import Header from "../../../SharedModule/components/Header/Header";
import NoData from "../../../SharedModule/components/NoData/NoData";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";


export default function Favorites() {

    // Pagenation
    const[arrayOfPage,setArrayOfPage]=useState([])
  // Filteration
  const[cateName,setNameValue]=useState('');

  const getNameValue=(input)=>{
    setNameValue(input.target.value)
     getFavoritesList(input.target.value);

  }


  let{baseUrl,requestHeaders}=useContext(AuthContext)

  const [favoritesList, setFavoritesList] = useState([]);

//  add button in view Favorite

  const getFavoritesList = async (name,pageSize,pageNumber) => {
    try {
      const response = await axios.get(
        `${baseUrl}/userRecipe/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: requestHeaders,
          params:{
            name:name,
          },
    
        }
      );
      console.log(response.data.data);
      let favList = response.data.data.map((fav) => {
        return { ...fav, checkColor: true };
      });
      setFavoritesList(favList);
      setArrayOfPage(Array(response.data.totalNumberOfPages).fill().map((_,i)=>i+1));

    } catch (error) {
      console.log(error);
    }
  };

  const deleteFavorite = async (favorite) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/userRecipe/${favorite.id}`,
        {
          headers: requestHeaders,
        }
      );
      console.log(response);
      console.log(favoritesList);
      let favoriteListChanged = favoritesList.map((fav) => {
        if (fav.id == favorite.id) {
          fav.checkColor = false;
        }
        return fav;
      });
      setFavoritesList(favoriteListChanged)
      toast.error("Reciepe Deleted From Your Favorite");
      // navigate("/dashboard/reciepes");
      getFavoritesList();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFavoritesList();
  }, []);
  return (
    <>
      <Header
        title={"Favorite Items"}
        description={
          "You can now add your items that any user can order it from the Application and you can editYou can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={reciepeHeaderImg}
      />

<div className="  container-fluid my-3">
      <div className="row">
        <div className="col-md-12">
          <input onChange={getNameValue} type="text" className=' form-control' placeholder='Search by Category name'/>
        </div>
      </div>
    </div>



      <div className="d-flex flex-wrap justify-content-center gap-3 align-items-center mt-5 ">
        {favoritesList.length > 0 ? (
          favoritesList.map((favorite) => (
            <div
              key={favorite.id}
              className="card rounded  shadow-lg p-3 mb-5 bg-white rounded"
              style={{ width: "345px" }}
            >
              {favorite.recipe.imagePath ? (
                <img
                  className="rounded border border-1  mx-auto d-block"
                  style={{ width: "242px", height: "168px" }}
                  src={`https://upskilling-egypt.com:3006/${favorite.recipe.imagePath}`}
                  alt="reciepe"
                />
              ) : (
                <img
                  src={noDataImg}
                  className="rounded border border-1  mx-auto d-block"
                  style={{ width: "242px", height: "168px" }}
                  alt="no reciepe"
                />
              )}

              <span
                className="position-absolute top-0 end-0 mt-2 me-2 border border-2 px-2 rounded"
                onClick={() => deleteFavorite(favorite)}
                title="Delete From Favorites"
              >
                {favorite.checkColor ? (
                  <i className="fas fa-heart text-success"></i>
                ) : (
                  <i className="fas fa-heart text-secondary"></i>
                )}
              </span>
              <div className="card-body">
                <p className="card-text">
                  Reciepe Name : {favorite.recipe.name}
                </p>
                <p className="card-text">
                  Reciepe description : {favorite.recipe.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <NoData />
        )}
      </div>
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
     getFavoritesList(cateName,10,PageNo)}>
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

    </>
  );
}
