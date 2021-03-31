import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../Context'

class HeaderButton extends Component {

    static contextType = UserContext;

    render() {
        console.log(this.context);
        const {
            user,          
        } = this.context;
        return (
            <div>
                {user ?
                 <div className="header-btn" >
                 <Link to={`/profile/${user.id}`}><span className="btn btn--main">profile</span></Link>                 
                </div>:
                     <div className="header-btn" >
                     <Link to="/login"><span className="btn btn--main">login</span></Link>
                     <Link to="/register"><span className="btn btn--main">register</span></Link>
                 </div>
                }
            </div>
         )
    }
}
export default HeaderButton;