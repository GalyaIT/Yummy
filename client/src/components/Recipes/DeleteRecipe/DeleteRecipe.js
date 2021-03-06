import { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import './_DeleteRecipe.scss'
import UserContext from '../../../Context'
import Loader from '../../Loader/Loader'
import * as recipesService from '../../../services/recipesService';


class DeleteRecipe extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props)
        this.state = {
            recipe: {},
            creator: {},
            loading: false,
        }
    }
    componentDidMount() {
        let recipeId = this.props.match.params.id;
        recipesService.getOne(recipeId)
            .then(res => {
                this.setState({ recipe: res, creator: res.creator, loading: true })
            });
    }
    onRecipeButtonClickHandler = () => {
        recipesService.deleteRecipe(this.props.match.params.id)
        this.props.history.push('/')
    };

    render() {
        const { recipe, creator, loading } = this.state
        const { user } = this.context;
        let userId = this.context.user.id
        let isCreator = creator._id === userId
        if (!user.loggedIn) {
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
}
export default DeleteRecipe


