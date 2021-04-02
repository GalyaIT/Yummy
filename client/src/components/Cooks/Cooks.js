import './_Cooks.scss'
import { Component } from 'react'
import * as authService from '../../services/authService'
import Cook from './Cook/Cook'

class Cooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cooks: [],
        }
    }
    // static contextType = UserContext;

    componentDidMount() {
        authService.getAll()
            .then(res => this.setState({ cooks: res }))
    }

    render() {
        return (
            <div className="cooks">

                <div className="cooks-wrapper">
                    {this.state.cooks.length === 0 ?
                        <span className="ccok-wrapper__message"> No users yet...</span> :
                        this.state.cooks.map(x =>
                            <Cook key={x._id}
                                id={x._id}
                                username={x.username}
                                recipes={x.recipes.length} />
                        )}
                </div>
            </div>
        )
    }


}

export default Cooks