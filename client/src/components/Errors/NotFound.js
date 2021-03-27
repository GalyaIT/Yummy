import {Link} from 'react-router-dom'
import './_NotFound.scss';
import sadIcon from '../../assets/icons/sad.svg'
import homeIcon from '../../assets/icons/home.svg'

const NotFound=()=>{
    return(
<div className="error-wrapper">
    <div className="error-wrapper__img">
        <img src={sadIcon} alt="sad"/>
    </div>
    <h2>Oops! Something went wrong...</h2>

    <p>Please go back to the previous page or go to <Link to="/"><img src={homeIcon} alt="home"/></Link></p>
    <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>

</div>
    )
}
export default NotFound;

