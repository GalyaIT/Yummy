import { Link } from 'react-router-dom';
import DropItem from './DropItem'

const DropDownMenu = () => {

    return (

        <nav className="dropdown ">
            <ul className="dropdown__items container  ">
                <Link to="/"><DropItem>home</DropItem></Link>
                <Link to="/recipes"><DropItem>recipes</DropItem></Link>
                <Link to="/cooks">  <DropItem>cooks</DropItem></Link>
                <Link to="/curious"><DropItem>curious</DropItem></Link>
                <Link to="/useful"> <DropItem>useful</DropItem></Link>
                <Link to="/login"> <DropItem>login</DropItem></Link>
                <Link to="/register"> <DropItem>register</DropItem></Link>
            </ul>
        </nav>
    )
}

export default DropDownMenu;