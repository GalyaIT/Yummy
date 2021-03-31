import { Component } from 'react'
import UserContext from '../../Context'


class Profile extends Component {
    static contextType = UserContext;

    logOut = () => {
        this.context.logOut();
        this.props.history.push('/')
    }

    render() {
        return (
            <div>
                <h1>profile page</h1>
                <button onClick={this.logOut}>logout</button>
            </div>

        )
    }
}
export default Profile