import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './_Search.scss';
import searchImg from '../../../assets/icons/navigation-search.svg';
import * as recipeService from '../../../services/recipesService'
import * as authService from '../../../services/authService'

const Search = (props) => {
    const [search, setSearch] = useState('')   
    const [placeholder, setPlaceholder] = useState('Select category to search...')
    const [searchCategory, setSearchCategory] = useState('')
    const history = useHistory();


    const handleSearchCategory = (e) => {

        setSearchCategory(e.target.value)
        if (e.target.value === 'Recipes') {
            console.log(e.target.value);
            setPlaceholder('Search recipes by title')
        } else
            if (e.target.value === 'Users') {
                setPlaceholder('Search users by username')
            } else {
                setPlaceholder('Select category to search...')
            }
    }


    const searchItems = async () => {
        if (searchCategory === 'Recipes') {
            if (search.trim()) {
                await recipeService.getRecipesBySearch(search)
                    .then(recipes => {
                        console.log(recipes);
                        history.push({
                            pathname: '/search/recipes',
                            state:
                            {
                                recipes
                            }
                        })
                    })
                setSearch('')
            } else {
                history.push('/recipes')
            }
        } else
            if (searchCategory === 'Users') {

                if (search.trim()) {
                    await authService.getAll()
                        .then(users => {
                            const username = search.toLowerCase()
                            let cooks = users.filter(x => x.username.toLowerCase().includes(username))
                            history.push({
                                pathname: '/search/users',
                                state:
                                {
                                    cooks
                                }
                            })
                        })
                    setSearch('')
                } else {
                    history.push('/cooks')
                }
            } else {
                setSearch('')
            }
    }

    const handleKeyPress = (e) => {
        console.log(e)
        if (e.charCode === 13) {
            searchItems();
        }
    }

    return (

        <div className="search-box">
            <select className="search-box__search-category" name="searchCategory"
                value={searchCategory} type="text"
                onChange={handleSearchCategory}  >
                <option value="">Select</option>
                <option value="Recipes">Recipes</option>
                <option value="Users">Users</option>
            </select>
            <input className="search-box__search-txt "
                type="text"
                name="search"
                placeholder={placeholder}
                onKeyPress={handleKeyPress}
                value={search}
                onChange={(e) => setSearch(e.target.value)} />
            <span className="search-box__search-button " onClick={searchItems}>
                <img className="search-box__search-image" src={searchImg}
                    alt="Search" /></span>
        </div>
    )
}
export default Search;