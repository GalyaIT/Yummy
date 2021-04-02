import { Component, useContext, useState, useEffect } from 'react'
import {Redirect, Link} from 'react-router-dom'
import UserContext from '../../../Context'
import Input from '../../Input/Input'
import SubmitButton from '../../Button/Submit-button'
import * as recipesService from '../../../services/recipesService'


const EditRecipe = ({history, match}) => {

    
// const[title, setTitle]=useState('')
// const[imageUrl, setImageUrl]=useState('')
// const[description, setDescriptipn]=useState('')
// const[category, setCategory]=useState('')
const[recipe, setRecipe]=useState('')

const context = useContext(UserContext)
const user = context.user;

useEffect(() => {
    recipesService.getOne(match.params.id)
        .then(res => setRecipe(res));
}, [])

    const updateRecipeSubmitHandler = (e) => {
        e.preventDefault();
        console.log(e.target);

        let recipeId = match.params.id;
        let updatedRecipe = {...recipe, 
        title:e.target.title.value,
        imageUrl: e.target.description.value,
        description: e.target.description.value,
        category: e.target.description.category,
    };

        recipesService.update(recipeId, updatedRecipe)
            .then(() => {
                history.push(`/details/${recipeId}`);
                return;
            });


    }

      
     if(!user.loggedIn){
        return <Redirect to="/login"/>
        }

    return (
        <section>
            <h1>Edit Recipe</h1>
            <form onSubmit={updateRecipeSubmitHandler}>
                <div>
                    <label htmlFor="title">Title</label>                
                    <input type='text' id='title' value={recipe.title} />
                </div>
                <div>
                    <label htmlFor="imageUrl">ImageUrl</label>                
                    <input type='text' id='imageUrl' value={recipe.imageUrl} />
                </div>
                <p >
                    <label for="description">Description</label>
                    <span >
                        <textarea rows="4" cols="45" type="text" name="description" id="description"
                            placeholder="Description" defaultValue={recipe.description}></textarea>
                        <span class="actions"></span>
                    </span>
                </p>
                <p>
                    <label htmlFor="Category">Category</label>
                    <span>
                        <select name="category" type="text">
                            <option value={recipe.category}>---Select category---</option>
                            <option value="Soups">Soups</option>
                            <option value="Salads">Salads</option>
                            <option value="Main-dishes">Main dishes</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Bread">Bread</option>
                        </select>
                    </span>
                </p>

            
                <SubmitButton title="Edit Resipe" />
            </form>
        </section>

    )


}

export default EditRecipe