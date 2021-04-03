import { Component } from 'react'
import * as authService from '../../services/authService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Input from '../Input/Input'
import Heading from '../Shared/Heading/Heading'

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            rePassword:"",
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
        const { username, password, rePassword } = this.state;
        const url = 'http://localhost:4000/api/auth/register';
       //TODO validation

       await authService.authenticate(url,
        { username, password }, (user) => {            
            this.context.logIn(user)
            this.props.history.push('/')
        }, (e) => {
            console.log('Error', e);
        }
    );
}

    render() {
        const { username, password, rePassword } = this.state;
        return (
            <div className="wrapper">
                    <Heading title={'Register'}/>
                <form className="form-wrapper" onSubmit={this.handleSubmit}>
                    <Input
                        value={username}
                        onChange={e => this.handleChange(e, 'username')}
                        label="Username"
                        id="username"
                        placeholder="type your username" /> 
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
                        placeholder="**********"/>

                    <SubmitButton title="Register" />
                </form>
            </div>
        )
    }
}

export default Register