import { Component } from 'react';
import {Redirect} from 'react-router-dom'
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
      
     if(!user.loggedIn){
        return <Redirect to="/login"/>
        }
        return(
  
            <article className="recipe-card-details ">
                <section className="recipe-card-details__heading ">
                    <div className="recipe-card-details__heading__img" >
                        <img src={recipe.imageUrl} alt="" />
                    </div>
                </section>
                <section>
                    <div className="recipe-card-details__description centered-container" >
                        <h4>{recipe.title}</h4>
                        <button className="button" onClick={this.onRecipeButtonClickHandler}>
                            <i className="fas fa-heart"></i>delete </button>
                    </div>
                </section>
            </article>
        );
    }     
}
export default DeleteRecipe


