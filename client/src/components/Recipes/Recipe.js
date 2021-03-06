import {Link} from 'react-router-dom'
import likeIcon from '../../assets/icons/like.svg';
import heartIcon from '../../assets/icons/heart.svg';
import commentIcon from '../../assets/icons/comment.svg';
import userIcon from '../../assets/icons/user.svg';


const Recipe = ({
    id,
    title,
    description,
    imageUrl,
    category,
    creator,
    likes,
    favorites,
    comments
}) => {

    return (

        <article className="recipe-card ">
            <section className="recipe-card__heading ">
                <div className="recipe-card__heading__img" >
                    <img src={imageUrl} alt=""/>
                </div>
                <div className="recipe-card__statistic">

                    <div className="icon">
                        <img src={likeIcon} alt="" />
                        <p> <span>{likes} likes</span></p>
                    </div>
                    <div className="icon">
                        <img src={heartIcon} alt="" />
                        <p> <span>{favorites} favorite</span></p>
                    </div>
                    <div className="icon">
                        <img src={commentIcon} alt="" />
                        <p><span>{comments}</span> comments </p>
                    </div>
                    <div className="icon">
                        <img src={userIcon} alt="" />
                        <p>By @<span>{creator}</span>
                           </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="recipe-card__description centered-container" >
                    <h4>{title}</h4>                   
                    <p>{description}</p>
                    <Link to={`/recipe-details/${id}`} className="btn btn--card ">more</Link>
                </div>
            </section>
        </article>
    )
}

export default Recipe;