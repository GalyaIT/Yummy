import { Component} from 'react';
import { Link, Redirect} from 'react-router-dom';

import './_RecipeDetails.scss'
import * as recipesService from '../../../services/recipesService';
import heartIcon from '../../../assets/icons/like.svg';
import commentIcon from '../../../assets/icons/comment.svg';
import userIcon from '../../../assets/icons/user.svg';
import UserContext from '../../../Context'


class RecipeDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: {},
            creator: {},
            likes: []
        }
    }
    static contextType = UserContext;

    //Get recipe
    componentDidMount() {
        recipesService.getOne(this.props.match.params.id)
            .then(res => {
                this.setState({ recipe: res, creator: res.creator, likes: res.likes })
            });

    }

    //Update likes
    onRecipeButtonClickHandler = () => {
        let userId = this.context.user.id
        recipesService.like(this.props.match.params.id, userId)
            .then((updatedRecipe) => {
                this.setState(state => ({ ...state, likes: updatedRecipe.likes }))
            });
    };

    render() {
        let userId = this.context.user.id
        const { recipe, creator, likes } = this.state
        let isCreator = creator._id === userId
        let isLiked = likes.some(x => x === userId)
        const {      
            user,       
            } = this.context;
          
         if(!user.loggedIn){
            return <Redirect to="/login"/>
            }
        return (
            <article className="recipe-card-details ">
                <section className="recipe-card-details__heading ">
                    <div className="recipe-card-details__heading__img" >
                        <img src={recipe.imageUrl} alt="" />
                    </div>
                    <div className="recipe-card-details__statistic">
                        <div className="icon">
                            <img src={heartIcon} alt="" />
                            <p> <span>{likes.length} likes</span></p>
                        </div>
                        <div className="icon">
                            <img src={commentIcon} alt="" />
                            <p><span>300</span> comments </p>
                        </div>
                        <div className="icon">
                            <img src={userIcon} alt="" />
                            <p>By {creator.username}  </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="recipe-card-details__description centered-container" >
                        <h4>{recipe.title}</h4>
                        <p>{recipe.description}</p>
                        {isCreator ?
                            <div>
                                <Link to={`/edit-recipe/${recipe._id}/edit`} className="btn btn--card ">edit</Link>
                                <Link to={`/delete-recipe/${recipe._id}/delete`} className="btn btn--card ">delete</Link>                               
                            </div>
                            :
                            <div>
                                {isLiked ?
                                    <p>Liked</p> :
                                    <button className="button" onClick={this.onRecipeButtonClickHandler}>
                                    <i className="fas fa-heart"></i>like </button>
                                }
                            </div>
                        }
                    </div>
                </section>
            </article>
        );
    }
};
export default RecipeDetails;

