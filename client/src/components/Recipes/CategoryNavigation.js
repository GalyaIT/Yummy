import { NavLink } from 'react-router-dom';
import NavItem from './CategoryItem';

const CategoryNavigation = () => {
    return (
        <ul className ="category-items">
            <NavLink to="/recipes"><NavItem>all (5)</NavItem></NavLink>
            <NavLink to="/recipes/Soups"><NavItem>soups</NavItem></NavLink>
            <NavLink to="/recipes/Salads"><NavItem>salads</NavItem></NavLink>
            <NavLink to="/recipes/Main-dishes"> <NavItem>main dishes</NavItem></NavLink>
            <NavLink to="/recipes/Desserts"><NavItem>desserts</NavItem></NavLink>
            <NavLink to="/recipes/Bread"> <NavItem>bread</NavItem></NavLink>
        </ul>          
    )
}
export default CategoryNavigation;