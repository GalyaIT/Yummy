import {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import NavItem from './CategoryItem';
import * as recipesService from '../../services/recipesService'

const CategoryNavigation = () => {

 const [recipeCount, setRecipeCount]=useState(0)

useEffect(()=>{
    recipesService.getAll()
    .then(res=>{      
       setRecipeCount(res.length)
    })
    
})

    return (
        <ul className ="category-items">
            <NavLink to="/recipes"><NavItem>all ({recipeCount})</NavItem></NavLink>
            <NavLink to="/recipes/Soups"><NavItem>soups</NavItem></NavLink>
            <NavLink to="/recipes/Salads"><NavItem>salads</NavItem></NavLink>
            <NavLink to="/recipes/Main-dishes"> <NavItem>main dishes</NavItem></NavLink>
            <NavLink to="/recipes/Desserts"><NavItem>desserts</NavItem></NavLink>
            <NavLink to="/recipes/Bread"> <NavItem>bread</NavItem></NavLink>
        </ul>          
    )
}
export default CategoryNavigation;