
// eslint-disable-next-line no-unused-vars
import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import headerimg from '../../../../assets/img/header.png'
import RecipeListHeader from '../../../SharedModule/components/RecipeListHeader/RecipeListHeader'
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

export default function Dashboard() {
  let{loginData}=useContext(AuthContext)

  return <>
   <Header
  title={`Welcome  ${loginData?.userName}`}

  description={'This is a welcoming screen for the entry of the application , you can now see the options'}
  imgUrl={headerimg}
  />
   <RecipeListHeader/>
  
  </>
}

