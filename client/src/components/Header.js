import React from 'react'
import HeaderButton from './HeaderButton'
import Navigation from './Navigation'
import logo from '../assets/images/egg.jpg';
import DropDownMenu from './DropDownMenu';

import menuIcon from '../assets/icons/menu.svg';
import crossMenuIcon from '../assets/icons/cross-menu.svg';
const images = {
    menu: menuIcon,
    cross: crossMenuIcon
}


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showDropDownMenu: false,
        }
        this.hideComponent = this.hideComponent.bind(this);
    }

    hideComponent() {

        this.setState({ showDropDownMenu: !this.state.showDropDownMenu });
    }
    getImageName = () => this.state.showDropDownMenu ? 'cross' : 'menu'
    render() {
        const showDropDownMenu = this.state.showDropDownMenu;
        const imageName = this.getImageName();
        return (

            <header className="header-wrapper">

                <section className="intro">
                    <div className="logo">
                        <h3>Yummy</h3>
                        <img src={logo} className="app-logo" alt="logo" />
                        <p>Join our cooking community</p>
                    </div>
                    <HeaderButton />
                </section>              
                <span class="toggle" onClick={() => this.hideComponent()}>
                    <img src={images[imageName]} />
                </span>
                {showDropDownMenu && <DropDownMenu />}

                <Navigation />               

            </header>
        )
    }

}

export default Header;