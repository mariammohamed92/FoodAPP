// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import {useNavigate} from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function RecipeListHeader() {

    let{loginData}=useContext(AuthContext)
    const navigate=useNavigate()

    const goToRecipeData=()=>{
        navigate('/dashboard/recipes')
      }
  return <>
  <div className="recipeheadercontainer m-3 p-5">
    <div className="row">
        <div className="col-md-6">
        {loginData?.userGroup == "SuperAdmin"?(
                        <div>
                        <h5>Fill the<span className=' text-success'>Recipes</span> !</h5>
                        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
                    </div>
        
    ):(
        <div>
        <h4>Show the  <span className=' text-success'>Recipes</span> !</h4>
        <p>you can now fill the meals easily using the table and form ,<br/>
             click here and sill it with the table!</p>
    </div>

    )}
        </div>
        <div className="col-md-6 text-end">
            <div>
                <button onClick={goToRecipeData} className=' btn btn-success'>All Recipes <i className="fa fa-arrow-right" aria-hidden="true"></i></button>
            </div>
        </div>
    </div>
  </div>
  
  
  </>
}

