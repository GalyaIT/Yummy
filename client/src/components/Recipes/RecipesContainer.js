import React from 'react';
import Recipe from './Recipe'

class RecipesContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
           
        }
    }

    componentDidMount() {
       fetch('http://localhost:8000/api/recipes')
       .then(res=>res.json())
       .then(res=>{
           this.setState({
            recipes:res
        })
       })        
    }

    render() {
        console.log(this.state.recipes);
        return (
            <div className="recipes-wrapper ">   
             <Recipe />
             <Recipe />
             <Recipe />
             <Recipe />
             <Recipe />
             <Recipe />
        </div>         
        )
    }
}

export default RecipesContainer;