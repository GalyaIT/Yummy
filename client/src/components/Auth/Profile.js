import { Component } from 'react'
import {Redirect, Link} from 'react-router-dom'
import UserContext from '../../Context'


class Profile extends Component {
    static contextType = UserContext;

    logOut = () => {
        this.context.logOut();
        this.props.history.push('/')
    }

    render() {
            const {      
                user,
                // loading,
                } = this.context;
                // if(loading){
                //     return <div>Loading...</div>

                // }
             if(!user.loggedIn){
                return <Redirect to="/login"/>
                }
        return (
            <div>
                <h1>profile page</h1>
             
                <Link to="/create-recipe">Add recipe</Link>
                <section>
                    <h3>My recipes</h3>

                </section>
                <section>
                    <h3>Fovourite recipe</h3>
                </section>

                <button onClick={this.logOut}>logout</button>
            </div>

        )
    }
}
export default Profile