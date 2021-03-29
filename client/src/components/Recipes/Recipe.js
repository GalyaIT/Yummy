
import heartIcon from '../../assets/icons/like.svg';
import commentIcon from '../../assets/icons/comment.svg';
import userIcon from '../../assets/icons/user.svg';
import soupImg from '../../assets/images/soup2.jpg';

const Recipe = ({
    id,
    title,
    description,
    imageUrl,
    category,
    creator,
    likes
}) => {

    return (

        <article className="recipe-card ">
            <section className="recipe-card__heading ">
                <div className="recipe-card__heading__img" >
                    <img src={imageUrl} />
                </div>
                <div className="recipe-card__statistic">

                    <div className="icon">
                        <img src={heartIcon} alt="" />
                        <p> <span>{likes}</span></p>
                    </div>

                    <div className="icon">
                        <img src={commentIcon} alt="" />
                        <p><span>300</span> </p>
                    </div>
                    <div className="icon">
                        <img src={userIcon} alt="" />
                        <p>By <span> {creator}</span>
                           </p>
                    </div>
                </div>
            </section>
            <section>
                <div className="recipe-card__description centered-container" >
                    <h4>{title}</h4>                   
                    <p>{description}</p>
                    <a href="#" className="btn btn--card ">more</a>
                </div>
            </section>
        </article>
    )
}

export default Recipe;