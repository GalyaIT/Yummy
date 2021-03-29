import { Component } from 'react'
import SubmitButton from '../Button/Submit-button'
import Input from '../Input/Input'
import * as authService from '../../services/authService'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            rePassword:"",
        }
    };
    handleChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value;
        this.setState(newState)
    }

    handleSubmit = async (event) => {
        event.preventDefault()
        const { username, password, rePassword } = this.state;
        const url = 'http://localhost:5000/api/auth/register';
       //TODO validation
       await authService.authenticate(url,
        { username, password }, () => {
            console.log('Yeyyy')
            this.props.history.push('/')
        }, (e) => {
            console.log('Error', e);
        }
    );

        // const response = await authService.registerUser(username, password, rePassword);
        // console.log(response);

        // if (response.username && document.cookie['x-auth-token'] !== null) {
        //     this.props.history.push('/')
        // }
    }

    render() {
        const { username, password, rePassword } = this.state;
        return (
            <div>
                <h1>Register</h1>
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
                    <Input
                        type="password"
                        value={rePassword}
                        onChange={e => this.handleChange(e, 'rePassword')}
                        label="rePassword"
                        id="rePassword" />

                    <SubmitButton title="Register" />
                </form>
            </div>
        )
    }
}

export default Register