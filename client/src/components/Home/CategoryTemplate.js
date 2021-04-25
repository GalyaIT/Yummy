import {Link} from 'react-router-dom'
import recipeIcon from '../../assets/icons/recipe.svg';
import likeIcon from '../../assets/icons/like.svg';
import heartIcon from '../../assets/icons/heart.svg';
import commentIcon from '../../assets/icons/comment.svg';
import RecipeIntro from './Recipe-Intro';



const CategoryTemplate = ({recipes, name, img}) => {
    
 let likes=0
 let favorite=0
 let comments=0
 for (var i = 0; i < recipes.length; i++) {
   likes += recipes[i].likes.length
   favorite+=recipes[i].favorites.length
   comments +=recipes[i].comments.length
 }

    return (
        <article className="category-card">
            <RecipeIntro />
            <div className="category-card__img" >
                <img src={img} alt="" />
            </div>
            <div className="category-card__info" >
                <h4>{name}</h4>

                <section className="category-card__info__statistic">
                    <div className="icon"> <img src={recipeIcon} alt="" />
                        <p> <span>{recipes.length}</span> recipes</p>
                    </div>

                    <div className="icon">
                        <img src={likeIcon} alt="" />
                        <p> <span>{likes}</span> likes</p>
                    </div>
                    <div className="icon">
                        <img src={heartIcon} alt="" />
                        <p> <span>{favorite}</span> favorite</p>
                    </div>

                    <div className="icon">
                        <img src={commentIcon} alt="" />
                        <p><span>{comments}</span> comments</p>
                    </div>
                </section>

                <Link to='/recipes' className="btn btn--recipe ">All recipes</Link>
            </div>
        </article>
    )
}
export default CategoryTemplate;