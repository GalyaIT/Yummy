import { NavLink } from 'react-router-dom';
import NavItem from './CategoryItem';

const CategoryNavigation = () => {
    return (
        <ul >
            <NavLink to="/soups"><NavItem>soups</NavItem></NavLink>
            <NavLink to="/salads"><NavItem>salads</NavItem></NavLink>
            <NavLink to="/main-dishes"> <NavItem>main dishes</NavItem></NavLink>
            <NavLink to="/desserts"><NavItem>desserts</NavItem></NavLink>
            <NavLink to="/bread"> <NavItem>bread</NavItem></NavLink>
        </ul>
    )
}
export default CategoryNavigation;