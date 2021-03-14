import searchImg from '../assets/icons/navigation-search.svg';

const Search = () => {
    return (       
        <div className="search-box">
            <input className="search-box__search-txt " type="text" name="" placeholder="Type to search" />
            <a className="search-box__search-button " href="#" >
                <img className="search-box__search-image" src={searchImg}
                    alt="Search" /></a>
        </div>
    )
}
export default Search;