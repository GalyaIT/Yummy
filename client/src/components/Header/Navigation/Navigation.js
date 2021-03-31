import { Component } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../../Context'
import Search from '../Search/Search'
import NavItem from './NavItem';


class Navigation extends Component {
    static contextType = UserContext;

    render() {        
      const loggedIn = this.context.user && this.context.user.loggedIn
        return (
            <nav className="navbar">
                {loggedIn ?
                    <ul className="navbar__items container ">
                        <Link to="/"><NavItem>home</NavItem></Link>                       
                        <Link to="/curious"><NavItem>curious</NavItem></Link>
                        <Link to="/useful"> <NavItem>useful</NavItem></Link>
                        <Link to="/recipes"><NavItem>recipes</NavItem></Link>
                        <Link to="/cooks"> <NavItem>cooks</NavItem></Link>                      
                    </ul> :
                    <ul className="navbar__items container ">
                        <Link to="/"><NavItem>home</NavItem></Link>                     
                        <Link to="/curious"><NavItem>curious</NavItem></Link>
                        <Link to="/useful"> <NavItem>useful</NavItem></Link>
                    </ul>
                }
                <Search />
            </nav>
        )
    }
}

export default Navigation;