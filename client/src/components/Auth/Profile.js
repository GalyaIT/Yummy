
import { useState, useContext, useEffect, useRef } from 'react'
import {  Link } from 'react-router-dom'
import './_Profile.scss'
import * as recipesService from '../../services/recipesService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Recipe from '../Recipes/Recipe'


const Profile = ({ history }) => {

    const [recipes, setRecipes] = useState([])
    const [favoriteRecipes, setFavoriteRecipes] = useState([])   
    const viewRecipesRef = useRef(null);  
    const viewFavRecipesRef = useRef(null);  
    const context = useContext(UserContext);
    const username = context.user.username

    const logOut = () => {
        context.logOut();
        history.push('/')
    }

    useEffect(() => {
        let userId = context.user.id;
        recipesService.getAllOwn(userId)
            .then(res => {
                console.log(res);
                setRecipes(res)
            })
        recipesService.getAllFavorite(userId)
            .then(res => {
                console.log(res);
                setFavoriteRecipes(res)
            })

    }, [])


    const showMyOwnRecipes = () => { 
        const section = viewRecipesRef.current     
        if(section.style.display==='none') {
             section.style='display:flex'
             viewFavRecipesRef.current.style="display:none"
             
        }else{
            section.style='display:none'        
           
        } 
    }

    const showMyFavoriteRecipes = () => {
        const section = viewFavRecipesRef.current      
        if(section.style.display==='none') {
             section.style='display:flex'
             viewRecipesRef.current.style="display:none"           
        }else{
            section.style='display:none'      
        }     
    }
 

    return (

        <div className="profile-wrapper">
            <section className="profile-wrapper__info">
                <div className="profile-info">
                    <p>Username: {username} </p>
                    <SubmitButton title="Logout" onClick={logOut} />
                </div>
                <div className="profile-add-recipe">
                    <Link to="/create-recipe" className="btn btn--card">Add recipe</Link>
                </div>

                <section className="recipes-section" >
                    <div className="recipes-section__items" onClick={showMyOwnRecipes} >
                        <h5>My recipes ({recipes.length})</h5>
                    </div>
                    <div className="recipes-section__items" onClick={showMyFavoriteRecipes} >
                        <h5>Fovorite recipes ({favoriteRecipes.length})</h5>
                    </div>
                </section>
            </section>

            <div className="profile-recipe-container">
                <section className="selected-recipes-own" ref={viewRecipesRef} >
                    {recipes.length !== 0 ?
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
                        ) :
                        <p>No recipes</p>
                    }
                </section>

                <section className="selected-recipes-fav"ref={viewFavRecipesRef} >
                    {favoriteRecipes.length !== 0 ?
                        favoriteRecipes.map(x =>
                            <Recipe key={x._id}
                                id={x._id}
                                title={x.title}
                                description={x.description}
                                category={x.category}
                                creator={x.creator.username}
                                imageUrl={x.imageUrl}
                                likes={x.likes.length}
                            />
                        ) :
                        <p>No recipes</p>
                    }
                </section>
            </div>
        </div>
    )
}
export default Profile
