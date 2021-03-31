import { Component } from 'react'
import UserContext from '../../../Context'
import { Link} from 'react-router-dom';
import DropItem from './DropItem'



class DropDownMenu extends Component {
    static contextType = UserContext;

    render() {
        const {         
            user
        } = this.context;
        let className="green"
        return (
            <nav className="dropdown">
            {user ?
                <ul className="dropdown__items container narrow">
                    <Link to="/"><DropItem >home</DropItem></Link>                      
                    <Link to="/curious"><DropItem>curious</DropItem></Link>
                    <Link to="/useful"> <DropItem>useful</DropItem></Link>
                    <Link to="/recipes"><DropItem>recipes</DropItem></Link>
                    <Link to="/cooks">  <DropItem>cooks</DropItem></Link>
                    <Link to={`profile/${user.id}`}> <DropItem className={className}>profile</DropItem></Link>                                      
                </ul> :
                <ul className="dropdown__items container ">
                    <Link to="/"><DropItem> home</DropItem></Link>                       
                    <Link to="/curious"><DropItem >curious</DropItem></Link>
                    <Link to="/useful"> <DropItem >useful</DropItem></Link>
                    <Link to="/login"> <DropItem className={className} >login</DropItem></Link>
                    <Link to="/register"> <DropItem className={className}>register</DropItem></Link>
                </ul>
              }
        </nav>
        )
    }
}

export default DropDownMenu;