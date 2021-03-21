
import heartIcon from '../../assets/icons/like.svg';
import commentIcon from '../../assets/icons/comment.svg';
import userIcon from '../../assets/icons/user.svg';
import soupImg from '../../assets/images/soup2.jpg';

const Recipe = (props) => {

    return (
        <article className="recipe-card ">
            <section className="recipe-card__heading ">
                <div className="recipe-card__heading__img" >
                    <img src={soupImg} alt="soup" />
                </div>
                <div className="recipe-card__statistic">
                    <div className="icon">
                        <img src={heartIcon} alt="" />
                        <p> <span>567</span> likes</p>
                    </div>
                    <div className="icon">
                        <img src={commentIcon} alt="" />
                        <p><span>300</span> comments</p>
                    </div>
                    <div className="icon">
                        <img src={userIcon} alt="" />
                        <p>By <span> Anna Smit</span></p>
                    </div>
                </div>
            </section>
            <section>
                <div className="recipe-card__description centered-container" >
                    <h4>Pumkin soup</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur, aliquid error. Tempora, magni culpa beatae consequuntur praesentium ratione sunt voluptas!</p>
                    <a href="#" className="btn btn--card ">more</a>
                </div>
            </section>
        </article>
    )
}
export default Recipe;