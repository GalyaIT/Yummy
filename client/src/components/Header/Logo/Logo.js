import {Component} from 'react'
import UserContext from '../../../Context'
import logo from '../../../assets/images/egg.jpg';

class Logo extends Component {
    
    static contextType = UserContext;

    render(){
        const {          
            user               
        } = this.context;
        return(
            <div className="logo">
            <h3>Yummy</h3>
            <img src={logo} className="app-logo" alt="logo" />
            {user ?  <p>Welcome, @{user.username} </p>:
             <p>Join our cooking community</p>
            }          
            </div>
        )
    }
}
export default Logo;