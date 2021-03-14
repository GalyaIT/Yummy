import HeaderButton from './HeaderButton'
import Navigation from './Navigation'
import logo from '../assets/images/egg.jpg';


const Header = () => {

    return (
        <header className="header-wrapper">
            <section className="intro">
                <div className="logo">
                    <h3>Yummy</h3>
                    <img src={logo} className="App-logo" alt="logo" />
                    <p>Join our cooking community</p>
                </div>
                <HeaderButton />
            </section>
            <Navigation />
        </header>
    )
}

export default Header;