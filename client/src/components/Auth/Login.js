import { Component } from 'react'
import './_Login.scss'
import * as authService from '../../services/authService'
import UserContext from '../../Context'
import SubmitButton from '../Button/Submit-button'
import Input from '../Input/Input'
import Heading from '../Shared/Heading/Heading'



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
        const url = 'http://localhost:4000/api/auth/login';
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
            <div className="wrapper">
                <Heading title={'Login'}/>            
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
                        placeholder="**********"  />
                      <SubmitButton title="Login" />
                </form>
            </div>
        )
    }
}

export default Login