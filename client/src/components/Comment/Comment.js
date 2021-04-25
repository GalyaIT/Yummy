import Moment from 'react-moment';
import './_Comment.scss'
const Comment = ({ content, creator, createdAt }) => {
 
    return (

        <div className="comment-wrapper  ">          
            <section className="comment_content ">
                 <p >{content}</p>
            </section>
            <section className="comment_info ">
                   <p>posted by @{creator}</p>
           <p>at <Moment format="DD MMM YYYY HH:mm:ss">{createdAt}</Moment></p>
            </section>      
        </div>
    )
}
export default Comment