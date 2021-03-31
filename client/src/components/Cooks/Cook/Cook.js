import './_Cook.scss'
import userIcon from '../../../assets/icons/user.svg';
import recipeIcon from '../../../assets/icons/recipe.svg';
const Cook = ({
    id,
   username,  
    recipes
}) => {

    return (

        <article className="cook-card ">            
                <section className="cook-card__info" >
                    <div className="icon">
                          <img src={userIcon} alt="user" />
                   <p> @{username}</p>
                    </div>
              
                </section>
                <section className="recipe-card__recipes">
                    <div className="icon">
                        <img src={recipeIcon} alt="recipe" />
                        <p> <span>{recipes} recipes</span></p>
                    </div>                   
                </section>
          
        </article>
    )
}

export default Cook;