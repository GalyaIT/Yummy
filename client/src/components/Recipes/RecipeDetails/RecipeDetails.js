import { Component, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './_RecipeDetails.scss'
import * as recipesService from '../../../services/recipesService';

import likeIcon from '../../../assets/icons/like.svg';
import heartIcon from '../../../assets/icons/heart.svg';
import commentIcon from '../../../assets/icons/comment.svg';
import userIcon from '../../../assets/icons/user.svg';
import UserContext from '../../../Context'
import SubmitButton from '../../Button/Submit-button'
import Comments from '../../Comment/Comments'

class RecipeDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            recipe: {},
            creator: {},
            likes: [],
            user: {},
            favorites: [],
            comments: [],
            content: '',
            errorMessage:''

        }
    }
    static contextType = UserContext;

    //Get recipe
    componentDidMount() {
        recipesService.getOne(this.props.match.params.id)
            .then(res => {
                this.setState({
                    recipe: res,
                    creator: res.creator,
                    likes: res.likes,
                    favorites: res.favorites,
                    comments: res.comments,
                })
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

    onRecipeButtonAddFavoriteClickHandler = () => {
        let userId = this.context.user.id
        let recipeId = this.props.match.params.id

        recipesService.addToFavorite(recipeId, userId)
            .then(res => {
                console.log(res);
                this.setState(state => ({ ...state, recipes: res, favorites: res.favorites }))
            })
    }


    createCommentSubmitHandler = (e) => {
        e.preventDefault();
        let username = this.context.user.username
        let { content } = e.target;
        let recipeId = this.props.match.params.id
        console.log(content.value);
        if (content.value.length <5) {
           return this.setState({errorMessage:'The content must be at length 5 or more'})
        } else {
            recipesService.createComment(content.value, recipeId, username)
                .then((res) => {
                    console.log(res);
                    this.setState(state => ({ ...state, resipe: res, comments: res.comments }))
                    console.log(res);
                    console.log(res.comments);

                })
            content.value = ''
        }
    };



    render() {
        const {
            user
        } = this.context;
        let userId = this.context.user.id
        const { recipe, creator, likes, favorites, comments, errorMessage } = this.state       
        
        let isCreator = creator._id === userId
        let isLiked = likes.some(x => x === userId)
      
        let isFavorite = favorites.some(x => x === userId)        

        if (!user.loggedIn) {
            return <Redirect to="/login" />
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
                                <img src={heartIcon} alt="" />
                                <p> <span>{favorites.length} favorites</span></p>
                            </div>
                            <div className="icon">
                                <img src={commentIcon} alt="" />
                                <p><span>{comments.length}</span> comments </p>
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
                                <>
                                    <div className="recipe-like">
                                        {isLiked ?
                                            <>
                                                <p><img src={likeIcon} alt="" /> You and {likes.length - 1} other liked</p>

                                            </> :
                                            <>
                                                <button className="btn btn--like" onClick={this.onRecipeButtonClickHandler}>like </button>
                                            </>
                                        }
                                    </div>
                                    <div className="recipe-like">
                                        {isFavorite ?
                                            <>
                                                <p><img src={heartIcon} alt="" /> You and {favorites.length - 1} other added this recipe </p>

                                            </> :
                                            <>
                                                <button className="btn btn--like" onClick={this.onRecipeButtonAddFavoriteClickHandler}>Add to favorite </button>
                                            </>
                                        }
                                    </div>
                                </>
                            }
                        </div>
                        {errorMessage && <p className="error">{errorMessage}</p>}
                        <form className="form-comment-wrapper" onSubmit={this.createCommentSubmitHandler}>
                            <textarea rows="5"  type="text" name="content" id="content"
                                placeholder="Type your text here...." ></textarea>                            
                            <SubmitButton title="Add Comment" />                      
                          </form>
                        <div>
                            <Comments recipeId={this.props.match.params.id} />                         
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};
export default RecipeDetails;



