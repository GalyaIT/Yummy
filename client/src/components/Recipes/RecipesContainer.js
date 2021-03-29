import React from 'react';
import Recipe from './Recipe';
import CategoryNavigation from './CategoryNavigation';
import * as recipesService from '../../services/recipesService';

class RecipesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            currentCategory: '',
        }
    }

    componentDidMount() {
        recipesService.getAll()
            .then(res => this.setState({ recipes: res }))
    }

    componentDidUpdate(prevProps) {
        const category = this.props.match.params.category;

        if (prevProps.match.params.category === category) {
            return;
        }

        recipesService.getAll(category)
            .then(res => {
                this.setState({ recipes: res, currentCategory: category })
            })
    }

    render() {


        return (
            <div className="recipes">
                <CategoryNavigation />
                <div className="recipes-wrapper">
                    {this.state.recipes.length === 0 ? <span className="recipes-wrapper__message"> No recipes yet...</span> :
                        this.state.recipes.map(x =>
                            <Recipe key={x.id}
                                title={x.title}
                                description={x.description}
                                category={x.category}
                                creator={x.creator.username}
                                imageUrl={x.imageUrl}
                                likes={x.likes.length} />
                        )}
                    {/* <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe />
                    <Recipe /> */}
                </div>
            </div>
        )
    }
}

export default RecipesContainer;