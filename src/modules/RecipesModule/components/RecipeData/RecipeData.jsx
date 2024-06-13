/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import { useForm} from 'react-hook-form';
import axios from 'axios';
import { useLocation, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import RecipeListHeader from '../../../SharedModule/components/RecipeListHeader/RecipeListHeader';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function RecipeData() {
  let{baseUrl,requestHeaders}=useContext(AuthContext)
const location=useLocation();
console.log(location);
const status = location.state?.type==='edit'
const recipeData=location.state?.recipeData;
const[tagId,setTagId]=useState('');
const[categoryId,setCategoryId]=useState([])
  // Navigate
const navigate=useNavigate()

  // Category List in Form
const [categoriesList,setCategoriesList]=useState([]);
// TagesList
const [tagsList,setTagsList]=useState([]);

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
        }=useForm();

        const appendToFormData=(data)=>{
          const formData=new FormData();
          formData.append('name',data.name);
          formData.append('price',data.price);
          formData.append('description',data.description);
          formData.append('categoriesIds',data.categoriesIds);
          formData.append('tagId',data.tagId);
          formData.append('recipeImage',data.recipeImage[0]);
          return formData;

        }
        // formData im upload img
        const onSubmit= async (data)=>{
          let receipeFormData=appendToFormData(data)
          console.log(data);

          try{
            let response = await axios(
          {
            method:status?'put':'post',
            url:status?`${baseUrl}/Recipe/${recipeData.id}`:
            `${baseUrl}/Recipe`,
            data:receipeFormData,
            headers:requestHeaders
          }
          );
    console.log(response);
    // response.data.message,
    toast.success('The Recipe created Successfully');
    navigate('/dashboard/recipes')
          }catch(error){
            console.log(error);
            // error.response.data.message
            toast.error('The Recipe Fail');

          }
    
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

    // GetCategoriesList &TagsList in Form callback
  useEffect(()=>{
    getCategoriesList();
    getTagesList();
    if (status&&recipeData) {
      setTagId(recipeData.tag.id);
      setCategoryId(recipeData.category[0]?.id);
    }
  },[]);

  return <>
  <RecipeListHeader/>
  <div className="p-5 ">
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>

{/* name */}
<div className="input-group mb-2">

<input type="text"
className="form-control"
placeholder="Recipe Name" 
{...register("name",{
required:"name is required",
}

)}
defaultValue={ status ? recipeData.name:""}
/>
</div>
{errors.name&&<p className=' alert alert-danger p-2'>{errors.name.message}</p>}

{/* Tag List */}
<div className="input-group mb-2">
  <select className=' form-control' 
  {...register("tagId",{
    required:"tag is required",
    })}
    value={tagId}
    onChange={(e)=> setTagId(e.target.value)}
  >
    <option value="">Tag </option>
    {tagsList.map((tag)=>(
    <option key={tag.id} value={tag.id} >{tag.name}</option>
    ))}
  </select>
</div>
{errors.tagId&&<p className=' alert alert-danger p-2'>{errors.tagId.message}</p>}

{/* price */}
<div className="input-group mb-2">
<input type="number"
className="form-control" 
placeholder="Recipe price"
{...register("price",{
required:"price is required",
}

)}
defaultValue={status ? recipeData.price:''}

/>
</div>
{errors.price&&<p className=' alert alert-danger p-2'>{errors.price.message}</p>}

{/* Category List */}
<div className="input-group mb-2">
  <select className=' form-control' 
  {...register("categoriesIds",{
    required:"categoriesIds is required",
    })}
    value={categoryId}
    onChange={(e)=> setCategoryId(e.target.value)}

  >
    <option value="">category</option>
    {categoriesList.map((cat)=>(
    <option key={cat.id} value={cat.id} >{cat.name}</option>
    ))}
  </select>
</div>
{errors.categoriesIds&&<p className=' alert alert-danger p-2'>{errors.categoriesIds.message}</p>}

{/* description */}
<div className="input-group mb-2">
<textarea 
className="form-control" 
placeholder="Recipe Description *"
{...register("description",{
required:"description is required",
})}
defaultValue={status ? recipeData.description:''}
></textarea>
</div>
{errors.description&&<p className=' alert alert-danger p-2'>{errors.description.message}</p>}
{/* Recipe img */}
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
                        {...register("recipeImage",{
                          required:"Image is required",
                          }
                          )}
                        onChange={handleInputContent}
                        // defaultValue={status?recipeData.recipeImage:''}

                      />
                    </label>
                  </div>
{errors.recipeImage&&<p className=' alert alert-danger p-2'>{errors.recipeImage.message}</p>} 


{/* button */}
<button className=' btn btn-success  mb-5 mt-3 px-4' >sava</button>
</form>  
</div>
  </>
}
