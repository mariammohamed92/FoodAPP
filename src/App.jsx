/* eslint-disable no-unused-vars */
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import MasterLayout from './modules/SharedModule/components/MasterLayout/MasterLayout';
import NotFound from './modules/SharedModule/components/NotFound/NotFound';
import Dashboard from './modules/UsersModule/components/Dashboard/Dashboard';
import RecipesList from './modules/RecipesModule/components/RecipesList';
import CategoriesList from './modules/CategoriesModule/components/CategoriesList';
import UsersList from './modules/UsersModule/components/UsersList/UsersList';
import AuthLayout from './modules/SharedModule/components/AuthLayout/AuthLayout';
import Login from './modules/AuthenticationModule/components/Login/Login';
import Register from './modules/AuthenticationModule/components/Register/Register';
import ForgetPass from './modules/AuthenticationModule/components/ForgetPass/ForgetPass';
import ResetPass from './modules/AuthenticationModule/components/ResetPass/ResetPass';
import ProtectedRout from './modules/SharedModule/components/ProtectedRout/ProtectedRout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RecipeData from './modules/RecipesModule/components/RecipeData/RecipeData';
import VerifyAccount from './modules/AuthenticationModule/components/VerifyAccount/VerifyAccount';
import FavList from './modules/Favorites/components/FavList/FavList';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext/AuthContext';

function App() {
  let{loginData,savaLoginData}=useContext(AuthContext)
  
  let routes = createBrowserRouter([
    {path:'dashboard',element:
    <ProtectedRout loginData={loginData}>
     <MasterLayout loginData={loginData}/>
</ProtectedRout>
     ,
    errorElement:<NotFound/>,
    children:[
      {index:true,element:<Dashboard/>},
      {path:'dashboard',element:<Dashboard/>},
      {path:'recipes',element:<RecipesList/>},
      {path:'recipedata',element:<RecipeData/>},
      {path:'recipeEdit/:id',element:<RecipeData/>},
      {path:'categories',element:<CategoriesList/>},
      {path:'user',element:<UsersList/>},
      {path:'favs',element:<FavList/>},

    ],
  },
  { path:'',element: <AuthLayout/>,errorElement:<NotFound/>,
  children:[
    {index:true,element:<Login savaLoginData={savaLoginData}/>},
    {path:'login',element:<Login savaLoginData={savaLoginData}/>},
    {path:'register',element:<Register/>},
    {path:'verifyaccount',element:<VerifyAccount/>},
    {path:'forgotpass',element:<ForgetPass/>},
    {path:'resetpass',element:<ResetPass/>},
  ],
  },
  ])

  return (
    <>
      <ToastContainer/>
   <RouterProvider router={routes}>
    </RouterProvider>
    </>
  );
}

export default App;

