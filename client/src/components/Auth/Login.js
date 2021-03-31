import { Component } from 'react'
import * as authService from '../../services/authService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Input from '../Input/Input'



class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    };
    static contextType=UserContext;
    handleChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value;
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { username, password } = this.state;
        const url = 'http://localhost:5000/api/auth/login';
        //TODO validation
        console.log(this.context);
        await authService.authenticate(url,
             {username, password} , (user) => {                             
                this.context.logIn(user)           
                this.props.history.push('/')
            }, (e) => {
                console.log('Error', e);
            }
        );
        
    }

    render() {
        const { username, password } = this.state;
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <Input
                        value={username}
                        onChange={e => this.handleChange(e, 'username')}
                        label="Username"
                        id="username" />
                    <Input
                        type="password"
                        value={password}
                        onChange={e => this.handleChange(e, 'password')}
                        label="Password"
                        id="password" />

                    <SubmitButton title="Login" />
                </form>
            </div>
        )
    }
}

export default Login