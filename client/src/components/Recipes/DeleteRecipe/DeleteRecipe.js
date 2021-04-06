import { Component } from 'react';
import {Redirect, Link} from 'react-router-dom'
import './_DeleteRecipe.scss'
import UserContext from '../../../Context'
import * as recipesService from '../../../services/recipesService';


class DeleteRecipe extends Component{
    static contextType = UserContext;
constructor(props){
    super(props)
    this.state={
        recipe:{}
    }
}
componentDidMount(){
    let recipeId = this.props.match.params.id;
    recipesService.getOne(recipeId)
    .then(res => {     
        this.setState({recipe:res})
    });
}
 onRecipeButtonClickHandler = () => {  
   recipesService.deleteRecipe(this.props.match.params.id) 
   this.props.history.push('/')        
};

    render(){
       const {recipe}=this.state
       const {user} = this.context;
      
    //  if(!user.loggedIn){
    //     return <Redirect to="/login"/>
    //     }
        return(
            <div className="recipe-wrapper">
            <article className="recipe-card-details ">
                <section className="recipe-card-details__heading ">
                    <div className="recipe-card-details__heading__img" >
                        <img src={recipe.imageUrl} alt="" />
                    </div>
                </section>
                <section>
                    <div className="recipe-card-details__description" >
                        <h4>{recipe.title}</h4>
                        <div className="recipe-delete-confirm">
                        <p>Are you sure want to delete?</p>
                        <button className="btn btn--delete" onClick={this.onRecipeButtonClickHandler}>
                            delete </button>
                            <Link to={`/recipe-details/${recipe._id}/edit`} className="btn btn--card ">back</Link>
                        </div>                       
                        
                    </div>
                </section>
            </article>
            </div>
        );
    }     
}
export default DeleteRecipe


