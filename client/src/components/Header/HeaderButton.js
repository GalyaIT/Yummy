import { Link } from 'react-router-dom';

function HeaderButton() {
    return (
        <div className="header-btn">
            <Link to="/login"><span className="btn btn--main">login</span></Link>
            <Link to="/register"><span className="btn btn--main">register</span></Link>


        </div>
    )
}

export default HeaderButton;