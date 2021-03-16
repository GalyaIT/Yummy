import Link from './Link';
import LoginAndSearch from './LoginAndSearch'
import Toggle from './Toggle';


const Navigation = () => {

    return (
        <nav className="navbar">
            <ul className="navbar__items container ">
            <li className="navbar__item">
                    <a href="#">recipes</a>
                </li>
                <li className="navbar__item">
                    <a href="#">cooks</a>
                </li>
                <li className="navbar__item">
                    <a href="#">curious</a>
                </li>

                <li className="navbar__item">
                    <a href="#">useful</a>
                </li>
             
            </ul>
            <LoginAndSearch />
            <Toggle />
        </nav>




    )
}

export default Navigation;