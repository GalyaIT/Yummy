import HeaderButton from './HeaderButton'
import Navigation from './Navigation/Navigation'
import DropDownMenu from './DropdownMenu/DropDownMenu';
import Logo from './Logo/Logo'


const Header = () => {

    return (
        <header className="header-wrapper">
            <section className="intro">
                <Logo />
                <HeaderButton />
            </section>
            <Navigation />
            <DropDownMenu />
        </header>
    )
}

export default Header;