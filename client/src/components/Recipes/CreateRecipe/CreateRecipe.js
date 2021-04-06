import { Component, useContext } from 'react'
import './_CreateRecipe.scss'

import Input from '../../Input/Input'
import Heading from '../../Shared/Heading/Heading'
import SubmitButton from '../../Button/Submit-button'
import * as RecipesService from '../../../services/recipesService'
import UserContext from '../../../Context'

const CreateRecipe = ({history}) => {

const context = useContext(UserContext)
const user = context.user;


    const createRecipeSubmitHandler = (e) => {
        e.preventDefault()

        const { title, imageUrl, description, category } = e.target;

        RecipesService.create(title.value, imageUrl.value, description.value, category.value, user)
        .then(()=>{
            history.push('/recipes')
        })
    }


    return (
        <section className="wrapper">
           <Heading title={'Add recipe :)'}/>   
            <form className="form-wrapper"onSubmit={createRecipeSubmitHandler}>
                <Input
                    label="Title"
                    id="title"
                    placeholder="Type title to your recipe" />
                <Input
                    label="ImageUrl"
                    id="imageUrl"
                    placeholder="Type imageUrl" />               
                <div className="recipe-description">
                    {/* <label for="description">Description</label> */}
                   
                        <textarea rows="5" cols="50" type="text" name="description" id="description"
                            placeholder="Type your text here...."></textarea>
                        {/* <span class="actions"></span> */}
                  
                </div>
                <div className="recipe-category">
                    <label htmlFor="Category">Category:</label>
                   
                        <select name="category" type="text">
                            <option value="">---Select category---</option>
                            <option value="Soups">Soups</option>
                            <option value="Salads">Salads</option>
                            <option value="Main-dishes">Main dishes</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Bread">Bread</option>
                        </select>
                    
                </div>            
                <SubmitButton title="Add" />
            </form>
        </section>
    )
}

export default CreateRecipe