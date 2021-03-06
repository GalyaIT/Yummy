import {Component} from 'react'
import {Link} from 'react-router-dom'
import './_Logo.scss';
import UserContext from '../../../Context'
import logo from '../../../assets/images/egg.jpg';

class Logo extends Component {
    
    static contextType = UserContext;

    render(){
        const user = this.context.user
        const loggedIn = this.context.user && this.context.user.loggedIn
        return(
            <div className="logo">
            <h3>Yummy</h3>
            <img src={logo} className="app-logo" alt="logo" />
            {loggedIn ?  <p>Welcome, @<Link to={`/profile/${user.id}`}>{user.username} </Link></p>:
             <p>Join our cooking community</p>
            }          
            </div>
        )
    }
}
export default Logo;