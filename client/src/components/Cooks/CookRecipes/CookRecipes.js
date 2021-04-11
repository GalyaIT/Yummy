import { useState, useEffect, useContext } from 'react'
import {Redirect} from 'react-router-dom'
import * as authServise from '../../../services/authService'
import './_CookRecipes.scss'
import UserContext from '../../../Context'
import Recipe from '../../Recipes/Recipe'
import Heading from '../../Shared/Heading/Heading'

const CookRecipes = ({ match }) => {
    const [recipes, setRecipes] = useState([])
    const [creator, setCreator]=useState('')
const context =useContext(UserContext)

    useEffect(() => {
        const userId = match.params.id
        authServise.getOne(userId)
            .then(res => {
                console.log(res);
                setRecipes(res.recipes)
                setCreator(res.username)
            })
    }, [])
   
    const loggedIn = context.user && context.user.loggedIn
    if (!loggedIn) {
        return <Redirect to="/login" />
    }
    return (
<section className="personal-recipes-section">
    <div className="personal-recipes-section__heading">
        <Heading title ={`${creator}'s recipes (${recipes.length})`}/>
    </div>
<div className="recipes-wrapper">
            {recipes.length === 0 ?
                <span className="recipes-wrapper__message"> No recipes yet...</span> :
                recipes.map(x =>
                    <Recipe key={x._id}
                        id={x._id}
                        title={x.title}
                        description={x.description}
                        category={x.category}                       
                        imageUrl={x.imageUrl}
                        likes={x.likes.length}
                        favorites={x.favorites.length}
                        creator={creator} />
                )}
        </div>
</section>
        
    )
}

export default CookRecipes;