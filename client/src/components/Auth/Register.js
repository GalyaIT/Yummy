import { Component } from 'react'
import {Link} from 'react-router-dom'
import * as authService from '../../services/authService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Input from '../Input/Input'
import Heading from '../Shared/Heading/Heading'
import Notification from '../Shared/Notifications/Notifications'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            rePassword: "",
            errors: {},
            message: ''
        }
    };
    static contextType = UserContext;

    handleChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value;
        this.setState(newState)
    }

    formValidation = () => {
        const { username, password, rePassword } = this.state;
        let isValid = true;
        const errors = {}

        if (username.trim().length < 3) {
            errors.usernameLength = 'Username must be at length 3 or more'
            isValid = false;
        }
        if (password.trim().length < 6) {
            errors.passwordLength = 'Password must be at length 6 or more'
            isValid = false;
        }else if (password.trim() !== rePassword.trim()) {
            errors.matchPasswords = 'Passwords don\'t match'
            isValid = false;
        }
        this.setState({ errors })
        return isValid
    }


    handleSubmit = async (event) => {
        event.preventDefault()
        // event.target.reset()
        const { username, password } = this.state;
        const url = 'http://localhost:4000/api/auth/register';
        const isValid = this.formValidation();
        console.log(isValid);
        if (isValid) {
            await authService.authenticate(url,
                { username, password }, (user) => {
                    this.context.logIn(user)
                    this.props.history.push('/')
                }, (err) => {
                    console.log(err);
                    this.setState({ message: err })
                    this.hideTimeout = setTimeout(() => this.setState({ message: '' }), 3000)
                }
            );
            this.setState({ username: "", password: "", rePassword: "" })
        }
    }
    componentWillUnmount() {
        clearTimeout(this.hideTimeout)
    }

    render() {
         const { username, password, rePassword, errors, message } = this.state;
        return (
            <div className="wrapper">
                <Heading title={'Register'} />
                { message &&
                    <Notification className="error" message={message} />}
                {Object.keys(errors).map((key) => {
                    return <div className="errors"key={key} >{errors[key]}</div>
                })}
                <form className="form-wrapper" onSubmit={this.handleSubmit}>
                    <Input
                        value={username}
                        onChange={e => this.handleChange(e, 'username')}
                        label="Username"
                        id="username"
                        placeholder="Type your username" />
                    <Input
                        type="password"
                        value={password}
                        onChange={e => this.handleChange(e, 'password')}
                        label="Password"
                        id="password"
                        placeholder="**********" />
                    <Input
                        type="password"
                        value={rePassword}
                        onChange={e => this.handleChange(e, 'rePassword')}
                        label="Confirm Password"
                        id="rePassword"
                        placeholder="**********" />

                    <SubmitButton title="Register" />
                </form>
                <div className="info-message">
                <p>You already have an account? Click here to<Link to="/login">Login</Link></p>
                
                </div>   
            </div>
        )
    }
}

export default Register