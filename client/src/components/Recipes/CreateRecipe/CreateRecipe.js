import { Component, useContext } from 'react'
import Input from '../../Input/Input'
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
        <section>
            <h1>Add Recipe</h1>
            <form onSubmit={createRecipeSubmitHandler}>
                <div>
                    <label htmlFor="title">Title</label>                
                    <input type='text' id='title' />
                </div>
                <div>
                    <label htmlFor="imageUrl">ImageUrl</label>                
                    <input type='text' id='imageUrl' />
                </div>
                <p >
                    <label for="description">Description</label>
                    <span >
                        <textarea rows="4" cols="45" type="text" name="description" id="description"
                            placeholder="Description"></textarea>
                        <span class="actions"></span>
                    </span>
                </p>
                <p>
                    <label htmlFor="Category">Category</label>
                    <span>
                        <select name="category" type="text">
                            <option value="">---Select category---</option>
                            <option value="Soups">Soups</option>
                            <option value="Salads">Salads</option>
                            <option value="Main-dishes">Main dishes</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Bread">Bread</option>
                        </select>
                    </span>
                </p>            
                <SubmitButton title="Add Resipe" />
            </form>
        </section>
    )
}

export default CreateRecipe