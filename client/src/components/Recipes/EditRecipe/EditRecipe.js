import { Component} from 'react'
import { Redirect } from 'react-router-dom'
import UserContext from '../../../Context'
import Input from '../../Input/Input'
import SubmitButton from '../../Button/Submit-button'
import * as recipesService from '../../../services/recipesService'


class EditRecipe extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipe: {}
        }
    }
    static contextType = UserContext;
   
    componentDidMount(){
        let recipeId = this.props.match.params.id;
        recipesService.getOne(recipeId)
        .then(res => {     
            this.setState({recipe:res})
            console.log(this.state.recipe);
        });
    }

    updateRecipeSubmitHandler = (e) => {
        e.preventDefault();
        //console.log(e.target);
        let recipeId = this.props.match.params.id;
       
        let updatedRecipe = {
            ...this.state.recipe,
            title: this.state.title,        
            imageUrl: e.target.imageUrl.value,
            description: e.target.description.value,
            category: e.target.category.value,
        };
        console.log(updatedRecipe);
        recipesService.update(recipeId, updatedRecipe)
            .then(() => {
                this.props.history.push(`/recipe-details/${recipeId}`);             
                return;
            });
    }

    handleChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value;
        this.setState(newState)
    }


    render() {
    const {recipe}=this.state;
    console.log(recipe.title);
   
       
        const loggedIn = this.context.user && this.context.user.loggedIn
        if (!loggedIn) {
        return <Redirect to="/login" />
    }
    return (
        <section>
            <h1>Edit Recipe</h1>
            <form onSubmit={this.updateRecipeSubmitHandler}>
                <div>
                    <label htmlFor="title">Title</label>                
                    <input type='text' id='title' defaultValue={recipe.title} onChange={e => this.handleChange(e, 'title')}/>
                </div>
                <div>
                    <label htmlFor="imageUrl">ImageUrl</label>                
                    <input type='text' id='imageUrl' defaultValue={recipe.imageUrl}  onChange={e => this.handleChange(e, 'imageurl')}/>
                </div>
                <p >                    
                     <label for="description">Description</label>
                    <span >
                        <textarea rows="4" cols="45" type="text" name="description" id="description"
                            placeholder="Description" defaultValue={recipe.description} onChange={e => this.handleChange(e, 'description')}></textarea>
                        <span class="actions"></span>
                    </span>
                </p>
                <p>
                    <label htmlFor="Category">Category</label>
                    <span>
                        <select name="category" type="text" onChange={e => this.handleChange(e, 'category')}>
                            <option value="" >{recipe.category}</option>
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
}

export default EditRecipe