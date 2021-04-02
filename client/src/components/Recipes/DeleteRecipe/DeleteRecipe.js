import { Component, useState, useEffect } from 'react';
import {Redirect, Link} from 'react-router-dom'
import UserContext from '../../../Context'
import * as recipesService from '../../../services/recipesService';


class DeleteRecipe extends Component{
    static contextType = UserContext;
constructor(props){
    super(props)
    this.state={
        recipe:{}
    }
}
componentDidMount(){
    let recipeId = this.props.match.params.id;
    recipesService.getOne(recipeId)
    .then(res => {     
        this.setState({recipe:res})
    });
}
 onRecipeButtonClickHandler = () => {   

   recipesService.deleteRecipe(this.props.match.params.id)   
       
            this.props.history.push('/')
        
};

    render(){
       const {recipe}=this.state
       const {      
        user,       
        } = this.context;
      
     if(!user.loggedIn){
        return <Redirect to="/login"/>
        }
        return(
  
            <article className="recipe-card-details ">
                <section className="recipe-card-details__heading ">
                    <div className="recipe-card-details__heading__img" >
                        <img src={recipe.imageUrl} alt="" />
                    </div>                    
                </section>
                <section>
                    <div className="recipe-card-details__description centered-container" >
                        <h4>{recipe.title}</h4>                      
                        <button className="button" onClick={this.onRecipeButtonClickHandler}>
                                    <i className="fas fa-heart"></i>delete </button>
                            </div>                     
                     
                </section>
            </article>
        );
}  
   
}
export default DeleteRecipe


// class DeleteRecipe extends Component {
//     constructor(props) {
//         super(props)

//         this.state = {
//             recipe: {},
//             creator: {},
//             likes: []
//         }
//     }
//     static contextType = UserContext;

//     //Get recipe
//     // componentDidMount() {
//     //     recipesService.getOne(this.props.match.params.id)
//     //         .then(res => {
//     //             console.log(res);
//     //             this.setState({ recipe: res, creator: res.creator, likes: res.likes })
//     //         });

//     // }

//     //Update likes
//     onRecipeButtonClickHandler = () => {
     
//         recipesService.deleteRecipe(this.props.match.params.id)
//             // .then((res) => {
//             //     this.setState(state => ({ ...state, likes: updatedRecipe.likes }))
//             // });
//     };

//     render() {
       
//         const { recipe, creator, likes } = this.state
//         // let isCreator = creator._id === userId
//         // let isLiked = likes.some(x => x === userId)

//         return (
//             <article className="recipe-card-details ">
//                 <section className="recipe-card-details__heading ">
//                     <div className="recipe-card-details__heading__img" >
//                         <img src={recipe.imageUrl} alt="" />
//                     </div>
//                     {/* <div className="recipe-card-details__statistic">
//                         <div className="icon">
//                             <img src={heartIcon} alt="" />
//                             <p> <span>{likes.length} likes</span></p>
//                         </div>
//                         <div className="icon">
//                             <img src={commentIcon} alt="" />
//                             <p><span>30</span> comments </p>
//                         </div>
//                         <div className="icon">
//                             <img src={userIcon} alt="" />
//                             <p>By {creator.username}  </p>
//                         </div>
//                     </div> */}
//                 </section>
//                 <section>
//                     <div className="recipe-card-details__description centered-container" >
//                         <h4>{recipe.title}</h4>
//                         <p>{recipe.description}</p>                   
                        
                               
//                         <button className="button" onClick={this.onRecipeButtonClickHandler}>
//                                     <i className="fas fa-heart"></i>delete </button>
//                             </div>                         
                            
                      
            
//                 </section>
//             </article>
//         );
//     }
// };
// export default DeleteRecipe;















// const DeleteRecipe=()=>{
//     return(
//         <h2>Are you sure want to delete?</h2>
//     )
// }

// export default DeleteRecipe