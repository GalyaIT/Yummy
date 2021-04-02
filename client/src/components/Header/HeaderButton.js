import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../Context'

class HeaderButton extends Component {

    static contextType = UserContext;

    render() {
        const user = this.context.user
        const loggedIn = this.context.user && this.context.user.loggedIn
        return (
            <div>
                {loggedIn ?
                    <div className="header-btn" >
                        <Link to={`/profile/${user.id}`}><span className="btn btn--main">profile</span></Link>
                    </div> :
                    <div className="header-btn" >                      
                        <Link to="/register"><span className="btn btn--main">register</span></Link>
                        <Link to="/login"><span className="btn btn--main">login</span></Link>
                    </div>
                }
            </div>
        )
    }
}
export default HeaderButton;