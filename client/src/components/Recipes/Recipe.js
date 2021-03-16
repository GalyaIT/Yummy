
import React from 'react';

class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: []
        }
    }

    getRecipes = async () => {
        const promise = await fetch('http://localhost:8000/api/recipes');
        const recipes = await promise.json();
        console.log(recipes);
        this.setState({
            recipes
        })

    }




    componentDidMount() {
        this.getRecipes()


    }
    render() {
        console.log(this.state.recipes);
        return (
            <h1>Hello From Recipe module</h1>
        )
    }
}

export default Recipe;