import recipeIcon from '../../assets/icons/recipe.svg';
import heartIcon from '../../assets/icons/like.svg';
import commentIcon from '../../assets/icons/comment.svg';
import Heading from './Heading';



const CategoryTemplate = (props) => {

    return (
        <article className="category-card">
            <Heading />
            <div className="category-card__img" >
                <img src={props.img} alt="" />
            </div>
            <div className="category-card__info" >
                <h4>{props.name}</h4>

                <section className="category-card__info__statistics">
                    <div className="icon"> <img src={recipeIcon} alt="" />
                        <p> <span>123</span> recipes</p>
                    </div>

                    <div className="icon">
                        <img src={heartIcon} alt="" />
                        <p> <span>567</span> likes</p>
                    </div>

                    <div className="icon">
                        <img src={commentIcon} alt="" />
                        <p><span>300</span> comments</p>
                    </div>
                </section>

                <a href="#" className="btn btn--recipe">All recipes</a>
            </div>
        </article>
    )
}
export default CategoryTemplate;