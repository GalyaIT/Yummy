import React, { useContext } from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import UserContext from '../../Context'
import MainContainer from '../Home/MainContainer'
import Recipes from '../Recipes/RecipesContainer'
import Useful from '../Useful/Useful'
import Cooks from '../Cooks/Cooks'
import Curious from '../Curious/Curious'
import Profile from '../Auth/Profile'
import Login from '../Auth/Login'
import Register from '../Auth/Register'
import NotFound from '../Errors/NotFound'


const Routing = () => {
    const context = useContext(UserContext)
    const loggedIn =  context.user && context.user.loggedIn

  
    return (
        <Switch>      
            <Route path="/" exact component={MainContainer}/>
            <Route path="/recipes" component={Recipes} exact />
            <Route path="/recipes/:category" component={Recipes} />          
            <Route path="/cooks">{loggedIn ? (<Cooks/>):(<Redirect to="/login"/>)} </Route>           
            <Route path="/profile" component={Profile} />
            <Route path="/useful" component={Useful} />
            <Route path="/curious" component={Curious} />
            <Route path="/login">{loggedIn ? (<Redirect to="/" />) : (<Login/>)}</Route>
            <Route path="/register">{loggedIn ? (<Redirect to="/" />) : (<Register/>)}</Route>
            <Route path="*" component={NotFound} />
        </Switch>
    )   
}

export default Routing