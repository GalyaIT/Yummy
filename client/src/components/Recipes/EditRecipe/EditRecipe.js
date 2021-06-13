import { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import UserContext from '../../../Context'
import Heading from '../../Shared/Heading/Heading'
import SubmitButton from '../../Button/Submit-button'
import Loader from '../../Loader/Loader'
import * as recipesService from '../../../services/recipesService'

class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: {},
            errors: [],
            creator: {},
            loading: false,
        }
    }
    static contextType = UserContext;

    componentDidMount() {
        let recipeId = this.props.match.params.id;
        recipesService.getOne(recipeId)
            .then(res => {
                this.setState({ recipe: res, creator: res.creator, loading: true })
            });
    }


    handleChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value;
        this.setState(newState)
    }

    formValidation = (updatedRecipe) => {
        let isValid = true;
        const errors = {}

        if (updatedRecipe.title.trim().length < 3) {
            errors.title = 'Title must be at length 3 or more'
            isValid = false;
        }
        if (updatedRecipe.imageUrl.trim().length === 0) {
            errors.image = 'The field imageUrl can\'t be empty'
            isValid = false;
        } else if (!updatedRecipe.imageUrl.startsWith('http')) {
            errors.image = 'Invalid Url'
            isValid = false;
        }
        if (updatedRecipe.description.trim().length < 10) {
            errors.description = 'Description must be at length 10 or more'
            isValid = false;
        }
        if (updatedRecipe.category === '') {
            console.log('here');
            errors.category = 'Choose category'
            isValid = false;
        }
        this.setState({ errors })
        return isValid
    }

    updateRecipeSubmitHandler = (e) => {
        e.preventDefault();
        let recipeId = this.props.match.params.id;

        let updatedRecipe = {
            ...this.state.recipe,
            title: e.target.title.value,
            imageUrl: e.target.imageUrl.value,
            description: e.target.description.value,
            category: e.target.category.value,
        };
        this.setState({ recipe: updatedRecipe })

        const isValid = this.formValidation(updatedRecipe);
        if (isValid) {
            recipesService.update(recipeId, updatedRecipe)
                .then(() => {
                    this.props.history.push(`/recipe-details/${recipeId}`);
                    return;
                });
        }
    }

    render() {
        const { recipe, errors, creator, loading } = this.state;
        const loggedIn = this.context.user && this.context.user.loggedIn
        let userId = this.context.user.id
        let isCreator = creator._id === userId

        if (!loggedIn) {
            return <Redirect to="/login" />
        }
        if (!loading) {
            return (
                <Loader />
            )
        }
        if (!isCreator) {
            return <p>You are not authorized to perform this operation</p>
        } else {
            return (
                <section className="wrapper">
                    <Heading title={'Edit recipe :)'} />
                    {Object.keys(errors).map((key) => {
                        return <p className="errors" key={key}> - {errors[key]}</p>
                    })}
                    <form className="form-wrapper" onSubmit={this.updateRecipeSubmitHandler}>
                        <div className="input">
                            <label htmlFor="title">Title</label>
                            <input type='text' id='title' placeholder="Type title to your recipe" defaultValue={recipe.title} onChange={e => this.handleChange(e, 'title')} />
                        </div>
                        <div className="input">
                            <label htmlFor="imageUrl">ImageUrl</label>
                            <input type='text' id='imageUrl' placeholder="Type imageUrl" defaultValue={recipe.imageUrl} onChange={e => this.handleChange(e, 'imageUrl')} />
                        </div>
                        <div className="recipe-description" >
                            <textarea rows="4" cols="45" type="text" name="description" id="description"
                                placeholder="Description" defaultValue={recipe.description} onChange={e => this.handleChange(e, 'description')}></textarea>
                        </div>
                        <div className="recipe-category">
                            <label htmlFor="Category">Category:</label>
                            <span>
                                <select name="category" type="text" onChange={e => this.handleChange(e, 'category')}>
                                    <option defaultValue="" >{recipe.category}</option>
                                    <option value="Soups">Soups</option>
                                    <option value="Salads">Salads</option>
                                    <option value="Main-dishes">Main dishes</option>
                                    <option value="Desserts">Desserts</option>
                                    <option value="Bread">Bread</option>
                                </select>
                            </span>
                        </div>
                        <div className="flex-buttons">
                            <SubmitButton title="Edit" />
                            <Link to={`/recipe-details/${recipe._id}/edit`} className="btn btn--submit">back</Link>
                        </div>
                    </form>
                </section>
            )
        }

    }
}

export default EditRecipe