import { Component } from 'react'
import Comment from './Comment'
import * as recipesService from '../../services/recipesService'

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: [],
            creator:''
        }
        console.log(props);
    }
    
    componentDidMount() {      
        let recipeId = this.props.recipeId
        recipesService.getAllComments(recipeId)
            .then(res => {
                console.log(res);
                this.setState({ comments: res })
            })
    }
    componentDidUpdate(){
        let recipeId=this.props.recipeId    

            recipesService.getAllComments(recipeId)
            .then(res=>{
                console.log(res);
                if(this.state.comments.length !== res.length){
                     this.setState({comments:res})
                }    
            })     
    }


    render() {
        const { comments } = this.state;
        console.log(comments);
        return (
            <div>
                {comments.length === 0 ?
                    <span className="recipes-wrapper__message"> No comments yet...</span> :
                    comments.sort((a, b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).map(x =>
                        <Comment key={x._id}
                            id={x._id}
                            createdAt={x.createdAt}
                            content={x.content}
                            creator={x.creator} />
                    )}
            </div>
        )
    }
}
export default Comments