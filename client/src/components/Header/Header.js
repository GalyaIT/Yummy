import React from 'react'

import HeaderButton from './HeaderButton'
import Navigation from './Navigation'
import DropDownMenu from './DropdownMenu/DropDownMenu';
import Logo from './Logo/Logo'
import menuIcon from '../../assets/icons/menu.svg';
import crossMenuIcon from '../../assets/icons/cross-menu.svg';
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
                    <Logo />
                    <HeaderButton />
                </section>              
                <span className="toggle" onClick={() => this.hideComponent()}>
                    <img src={images[imageName]} />
                </span>
                <Navigation />     
                {showDropDownMenu && <DropDownMenu />}                        

            </header>
        )
    }

}

export default Header;