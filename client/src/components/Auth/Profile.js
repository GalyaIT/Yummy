import { Component } from 'react'
import {Redirect} from 'react-router-dom'
import UserContext from '../../Context'


class Profile extends Component {
    static contextType = UserContext;

    logOut = () => {
        this.context.logOut();
        this.props.history.push('/')
    }

    render() {
            const {      
                user
                } = this.context;
             if(!user.loggedIn){
                return <Redirect to="/login"/>
                }
        return (
            <div>
                <h1>profile page</h1>
                <button onClick={this.logOut}>logout</button>
            </div>

        )
    }
}
export default Profile