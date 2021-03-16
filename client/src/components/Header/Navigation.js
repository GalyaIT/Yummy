import { Link } from 'react-router-dom';

import LoginAndSearch from './LoginAndSearch'
import NavItem from './NavItem';




const Navigation = () => {

    return (
        <nav className="navbar">
            <ul className="navbar__items container ">
            <Link to="/"><NavItem>home</NavItem></Link>
                <Link to="/recipes"><NavItem>recipes</NavItem></Link>
                <Link to="/cooks"> <NavItem>cooks</NavItem></Link>
                <Link to="/curious"><NavItem>curious</NavItem></Link>
                <Link to="/useful"> <NavItem>useful</NavItem></Link>             
            </ul>
            <LoginAndSearch />     
        </nav>




    )
}

export default Navigation;