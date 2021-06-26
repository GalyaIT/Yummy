import { Component } from 'react'
import {Link} from 'react-router-dom'
import './_Login.scss'
import * as authService from '../../services/authService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Input from '../Input/Input'
import Heading from '../Shared/Heading/Heading'
import Notification from '../Shared/Notifications/Notifications'


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errors: {},
            message: '',
        }
    };
    static contextType=UserContext;

    handleChange = (event, type) => {
        const newState = {}
        newState[type] = event.target.value;
        this.setState(newState)
    }

    formValidation = () => {
        const { username, password } = this.state;
        let isValid = true;
        const errors = {}

        if (username.trim().length < 3) {
            errors.usernameLenght = 'Username must be at length 3 or more'
            isValid = false;
        }
        if (password.trim().length < 6) {
            errors.passwordLenfht = 'Password must be at length 6 or more'
            isValid = false;
        }
        this.setState({ errors })
        return isValid
    }

    handleSubmit = async (event) => {
        event.preventDefault()

        const { username, password, } = this.state;
        const isValid = this.formValidation();
        const url = 'http://localhost:4000/api/auth/login';
        console.log(username);
        console.log(password);
        if (isValid) {
            console.log(this.context);
            await authService.authenticate(url,
                { username, password }, (user) => {
                    this.context.logIn(user);
                    console.log(this.context);
                    this.props.history.push('/')
                }, (err) => {
                    console.log('Error:', err);
                    this.setState({ message: err })
                    this.hideTimeout = setTimeout(() => this.setState({ message: '' }), 3000)
                }

            );
            this.setState({ username: "", password: "" })
        }
    }

    componentWillUnmount() {
        clearTimeout(this.hideTimeout)
    }

    render() {
        const { username, password, errors, message } = this.state;
        return (
            <div className="wrapper">
                <Heading title={'Login'}/>  
                { message && <Notification className="error" message={message} />}
                 {Object.keys(errors).map((key) => {
                    return <p className="errors" key={key}> - {errors[key]}</p>
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
                        placeholder="**********"  />
                      <SubmitButton title="Login" />
                </form>
                <div className="info-message">
                <p>Don't have an account yet? Click here to<Link to="/register">Register</Link></p>                
                </div>               
            </div>
        )
    }
}

export default Login