import { Component } from 'react'
import './_CreateRecipe.scss'

import Input from '../../Input/Input'
import Heading from '../../Shared/Heading/Heading'
import SubmitButton from '../../Button/Submit-button'
import * as RecipesService from '../../../services/recipesService'
import UserContext from '../../../Context'

class CreateRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            imageUrl: '',
            description: '',
            category: '',
            errors: []
        }
    }
    static contextType = UserContext;

    handleChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value;
        this.setState(newState)
    }

    formValidation = () => {
        const { title, imageUrl, description, category } = this.state;
        let isValid = true;
        const errors = {}

        if (title.trim().length < 3) {
            errors.title = 'Title must be at length 3 or more'
            isValid = false;
        }
        if (imageUrl.trim().length === 0) {
            errors.image = 'The field imageUrl can\'t be empty'
            isValid = false;
        } else if (!imageUrl.startsWith('http') || !imageUrl.startsWith('https')) {
            errors.image = 'Invalid Url'
            isValid = false;
        }
        if (description.trim().length < 10) {
            errors.description = 'Description must be at length 10 or more'
            isValid = false;
        }
        if (category === '') {
            console.log('here');
            errors.category = 'Choose category'
            isValid = false;
        }
        this.setState({ errors })
        return isValid
    }



    createRecipeSubmitHandler = (e) => {
        e.preventDefault()

        const { title, imageUrl, description, category } = this.state;
        const isValid = this.formValidation();
        const { user } = this.context


        if (isValid) {
            RecipesService.create(title, imageUrl, description, category, user)
                .then(() => {
                    this.props.history.push('/recipes')
                })
        }
    }


    render() {
        const { title, imageUrl, description, category, errors } = this.state;
        return (

            <section className="wrapper">
                <Heading title={'Add recipe :)'} />
                {Object.keys(errors).map((key) => {
                    return <p className="errors" key={key}> - {errors[key]}</p>
                })}

                <form className="form-wrapper" onSubmit={this.createRecipeSubmitHandler}>
                    <Input
                        value={title}
                        onChange={e => this.handleChange(e, 'title')}
                        label="Title"
                        id="title"
                        placeholder="Type title to your recipe"
                    />                 
                    <Input
                        value={imageUrl}
                        onChange={e => this.handleChange(e, 'imageUrl')}
                        label="ImageUrl"
                        id="imageUrl"
                        placeholder="Type imageUrl"
                    />                  
                    <div className="recipe-description">                 
                        <textarea rows="5" cols="50" type="text" name="description" id="description"
                            placeholder="Type your text here...." value={description} onChange={e => this.handleChange(e, 'description')} ></textarea>
                    </div>                
                    <div className="recipe-category">
                        <label htmlFor="Category">Category:</label>

                        <select name="category" value={category} type="text" onChange={e => this.handleChange(e, 'category')}  >
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
}

export default CreateRecipe