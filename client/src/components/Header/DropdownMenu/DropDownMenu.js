import { Component } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../../Context'
import DropItem from './DropItem'
import menuIcon from '../../../assets/icons/menu.svg';
import crossMenuIcon from '../../../assets/icons/cross-menu.svg';

const images = {
    menu: menuIcon,
    cross: crossMenuIcon
}


class DropDownMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: 'flex',
            showDropDownMenu: false,
        }
        this.close = this.close.bind(this)
        this.toggleShow = this.toggleShow.bind(this);
    }

    static contextType = UserContext;

    toggleShow() {
        this.setState({ showDropDownMenu: !this.state.showDropDownMenu });
    }

    close() {
        this.setState({ display: !this.state.display })
        this.toggleShow()
    }

    getImageName = () => this.state.showDropDownMenu ? 'cross' : 'menu'

    render() {
        const showDropDownMenu = this.state.showDropDownMenu;
        const imageName = this.getImageName();
        const user = this.context.user;
        const loggedIn = this.context.user && this.context.user.loggedIn
        let className = 'green'
        return (

            <div>
                <span className="toggle" onClick={() => this.toggleShow()}  >
                    <img src={images[imageName]} alt="menu-icon" />
                </span>
                {showDropDownMenu &&
                    <nav className="dropdown" onClick={this.close} style={{ display: this.state.display }}>
                        {loggedIn ?
                            <ul className="dropdown__items container">
                                <Link to="/"><DropItem >home</DropItem></Link>                               
                                <Link to="/useful"> <DropItem>useful</DropItem></Link>
                                <Link to="/curious"><DropItem>curious</DropItem></Link>
                                <Link to="/recipes"><DropItem>recipes</DropItem></Link>
                                <Link to="/cooks">  <DropItem>amateur chefs</DropItem></Link>
                                <Link to={`/profile/${user.id}`}> <DropItem className={className}>profile</DropItem></Link>
                            </ul> :
                            <ul className="dropdown__items container " onClick={this.close}>
                                <Link to="/"><DropItem> home</DropItem></Link>                               
                                <Link to="/useful"> <DropItem >useful</DropItem></Link>
                                <Link to="/curious"><DropItem >curious</DropItem></Link>                              
                                <Link to="/register"> <DropItem className={className}>register</DropItem></Link>
                                <Link to="/login"> <DropItem className={className} >login</DropItem></Link>
                            </ul>
                        }
                    </nav>
                }
            </div>
        )
    }
}
export default DropDownMenu;