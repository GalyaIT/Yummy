const NavItem =(props)=>{
    return(
        <li className="navbar__item">
        <span>{props.children}</span>
    </li>
    )
}

export default NavItem;