import { Component, Fragment} from 'react';
import { Link, Redirect} from 'react-router-dom';

import './_RecipeDetails.scss'
import * as recipesService from '../../../services/recipesService';
import likeIcon from '../../../assets/icons/like.svg';
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
          console.log(creator);
          console.log(isCreator);
         if(!user.loggedIn){
            return <Redirect to="/login"/>
            }
        return (
            <div className="recipe-wrapper">
                 <article className="recipe-card-details ">
                <section className="recipe-card-details__heading ">
                    <div className="recipe-card-details__heading__img" >
                        <img src={recipe.imageUrl} alt="" />
                    </div>
                    <div className="recipe-card-details__statistic">
                        <div className="icon">
                            <img src={likeIcon} alt="" />
                            <p> <span>{likes.length} likes</span></p>
                        </div>
                        <div className="icon">
                            <img src={commentIcon} alt="" />
                            <p><span>3</span> comments </p>
                        </div>
                        <div className="icon">
                            <img src={userIcon} alt="" />
                            <p>By @{creator.username}  </p>
                        </div>
                    </div>
                </section>
                <section>
                    <div className="recipe-card-details__description " >
                        <h4>{recipe.title}</h4>
                        <p>{recipe.description}</p>
                         {isCreator ?
                            <div className="recipe-card-details__buttons">
                                <Link to={`/edit-recipe/${recipe._id}/edit`} className="btn btn--card ">edit</Link>
                                <Link to={`/delete-recipe/${recipe._id}/delete`} className="btn btn--card ">delete</Link>                               
                            </div>
                            :
                            <div className="recipe-like">
                                {isLiked ?
                                <>
                                <p><img src={likeIcon} alt="" /> You and {likes.length-1} other </p>
                                 <p>Liked  </p>
                                </>:
                                    <button className="btn btn--like" onClick={this.onRecipeButtonClickHandler}>like </button>
                                }                              
                            </div>
                        }
                    </div>
                </section>
            </article>
            </div>
           
        );
    }
};
export default RecipeDetails;

