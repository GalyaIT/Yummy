import { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import './_Profile.scss'
import * as recipesService from '../../services/recipesService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Recipe from '../Recipes/Recipe'


class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: [],
            count: 0,
        }
    }
    static contextType = UserContext;



    logOut = () => {
        this.context.logOut();
        this.props.history.push('/')
    }

    componentDidMount(){
        let userId = this.context.user.id;
        recipesService.getAllOwn(userId)
        .then(res => {
            console.log(res);
            this.setState({ recipes: res, count: res.length })
        })
    }

    onMyOwnRecipeHandler = () => {
        let userId = this.context.user.id;
        recipesService.getAllOwn(userId)
            .then(res => {
                console.log(res);
                this.setState({ recipes: res, count: res.length })
            })
    }


    render() {

        let { recipes } = this.state
        const loggedIn = this.context.user && this.context.user.loggedIn;
        const username = this.context.user.username;


        if (!loggedIn) {
            return <Redirect to="/login" />
        }
        return (
            <div className="profile-wrapper">
                <section className="profile-wrapper__info">
                    <div className="profile-info">
                        <p>Username: {username} </p>
                        <SubmitButton title="Logout" onClick={this.logOut} />
                    </div>
                    <div className="profile-add-recipe">
                        <Link to="/create-recipe" className="btn btn--card">Add recipe</Link>
                    </div>

                    <section className="recipes-section">
                        <div className="recipes-section__items" onClick={this.onMyOwnRecipeHandler}>
                            <h5>My recipes ({recipes.length})</h5>
                        </div>
                        <div className="recipes-section__items" onClick={this.onMyFavouriteRecipeHandler}>
                            <h5>Fovourite recipes (3)</h5>
                        </div>
                    </section>
                </section>

                <section className="selected-recipes">
                    {this.state.recipes.length === 0 ?
                        <span className="recipes-wrapper__message"> No selected recipes ...</span> :
                        recipes.map(x =>
                            <Recipe key={x._id}
                                id={x._id}
                                title={x.title}
                                description={x.description}
                                category={x.category}
                                creator={x.creator.username}
                                imageUrl={x.imageUrl}
                                likes={x.likes.length}
                            />
                        )}

                </section>

            </div>

        )
    }
}
export default Profile