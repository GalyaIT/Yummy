import React, { useContext } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import UserContext from '../../Context'
import MainContainerPage from '../Home/MainContainer'
import RecipesPage from '../Recipes/RecipesContainer'
// import UsefulPage from '../Useful/Useful'
import CooksPage from '../Cooks/Cooks'
import CookRecipesPage from '../Cooks/CookRecipes/CookRecipes'
// import CuriousPage from '../Curious/Curious'
import ProfilePage from '../Auth/Profile'
import LoginPage from '../Auth/Login'
import RegisterPage from '../Auth/Register'
import NotFoundPage from '../Errors/NotFound'
import CreatePage from '../Recipes/CreateRecipe/CreateRecipe'
import DetailsPage from '../Recipes/RecipeDetails/RecipeDetails'
import EditPage from '../Recipes/EditRecipe/EditRecipe'
import DeletePage from '../Recipes/DeleteRecipe/DeleteRecipe'

const Routing = () => {
    const context = useContext(UserContext)
    const loggedIn =  context.user && context.user.loggedIn

  
    return (
       
 <Switch> 
          <Route path="/" exact component={MainContainerPage}/>
          <Route path="/recipes" component={RecipesPage} exact />            
          <Route path="/recipes/:category" component={RecipesPage} />   
          <Route path="/create-recipe" component={CreatePage}/> 
          <Route path="/recipe-details/:id" component={DetailsPage}/> 
          <Route path="/edit-recipe/:id" component={EditPage}/> 
          <Route path="/delete-recipe/:id" component={DeletePage}/> 
          <Route path="/cooks" exact>{loggedIn ? (<CooksPage/>):(<Redirect to="/login"/>)} </Route>  
          {/* <Route path="/cooks/:id">{loggedIn ? (<CookRecipesPage/>):(<Redirect to="/login"/>)} </Route>          */}
          <Route path="/cooks/:id" component={CookRecipesPage} />
          <Route path="/profile/:id" component={ProfilePage} />
          {/* <Route path="/useful" component={UsefulPage} />
          <Route path="/curious" component={CuriousPage} /> */}
          <Route path="/login">{loggedIn ? (<Redirect to="/" />) : (<LoginPage/>)}</Route>
          <Route path="/register">{loggedIn ? (<Redirect to="/" />) : (<RegisterPage/>)}</Route>
          <Route path="*" component={NotFoundPage} />
</Switch>
       
       
    )   
}

export default Routing