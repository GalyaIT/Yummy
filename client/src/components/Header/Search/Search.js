import './_Search.scss';
import searchImg from '../../../assets/icons/navigation-search.svg';

//TODO
const Search = () => {
    return (
        <div>
            <div className="search-box">
                <input className="search-box__search-txt " type="text" name="" placeholder="Type to search" />
                <a className="search-box__search-button " href="!#"  >
                    <img className="search-box__search-image" src={searchImg}
                        alt="Search" /></a>
            </div>
        </div>

    )
}
export default Search;