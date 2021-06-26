import Recipe from '../../Recipes/Recipe'
import Cook from '../../Cooks/Cook/Cook'


const SearchPage = (props) => {


    if (props.location.state.recipes) {

        return (         
                <div className="recipes-wrapper">

                    {props.location.state.recipes.length === 0 ?
                        <span className="recipes-wrapper__message"> No results found</span> :
                        props.location.state.recipes.map(x =>
                            <Recipe key={x._id}
                                id={x._id}
                                title={x.title}
                                description={x.description}
                                category={x.category}
                                creator={x.creator.username}
                                imageUrl={x.imageUrl}
                                likes={x.likes.length}
                                favorites={x.favorites.length}
                                comments={x.comments.length} />
                        )}
                </div>    
        )
    }
    if (props.location.state.cooks) {

        return (
            <div className="cooks">
                <div className="cooks-wrapper">

                    {props.location.state.cooks.length===0?
                    <span className="recipes-wrapper__message"> No results found</span> :
                    props.location.state.cooks.map(x =>
                        <Cook key={x._id}
                            id={x._id}
                            username={x.username}
                            recipes={x.recipes.length} />
                    )}
                </div>
            </div>
        )
    }
}
export default SearchPage