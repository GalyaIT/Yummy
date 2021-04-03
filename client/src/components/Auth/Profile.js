import { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import './_Profile.scss'
import * as recipesService from '../../services/recipesService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Recipe from '../Recipes/Recipe'


class Profile extends Component {
    constructor(props){
        super(props)
        this.state={
            recipes:[],
          
        }
    }
    static contextType = UserContext;


    logOut = () => {
        this.context.logOut();
        this.props.history.push('/')
    }

    
    // onRecipeButtonClickHandler = () => {
    //     let userId = this.context.user.id
    //     recipesService.like(this.props.match.params.id, userId)
    //         .then((updatedRecipe) => {
    //             this.setState(state => ({ ...state, likes: updatedRecipe.likes }))
    //         });
    // };

    onMyOwnRecipeHandler=()=>{
        let userId = this.context.user.id;
        recipesService.getAllOwn(userId)
        .then(res => {
            console.log(res);
            this.setState({ recipes: res })
        })
     
    }


    render() {
       

            const user = this.context;
            console.log(user);
                // if(loading){
                //     return <div>Loading...</div>

                // }
            //  if(!user.loggedIn){
            //     return <Redirect to="/login"/>
            //     }
        return (
            <div className="profile-wrapper">
                <section className="profile-wrapper__info">
                <div className="profile-info">
                    <p>Username: </p>
                    <SubmitButton title="Logout" onClick={this.logOut} />           
                </div>
                <div className="profile-add-recipe">
                    <Link to="/create-recipe" className="btn btn--card">Add recipe</Link>
                </div>
             
                <section className="recipes-section">
                <div className="recipes-section__items" onClick={this.onMyOwnRecipeHandler}>               
                    <h5>My recipes (6)</h5>               
                </div>
                <div className="recipes-section__items" onClick={this.onMyFavouriteRecipeHandler}>
                    <h5>Fovourite recipes (3)</h5>                  
                </div>
                </section>            
                </section>

                <section className="selected-recipes">
                {this.state.recipes.length === 0 ?
                        <span className="recipes-wrapper__message"> No selected recipes ...</span> :
                        this.state.recipes.map(x =>
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

                {/* {posts.map(x => 
                    <Post 
                        key={x.id} 
                        content={x.content}
                        author={x.author}
                    />
                )} */}
                </section>
               
                {/* <button onClick={this.logOut}>logout</button> */}
            </div>

        )
    }
}
export default Profile