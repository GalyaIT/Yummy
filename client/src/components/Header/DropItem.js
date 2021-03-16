const DropItem =(props)=>{
    return(
        <li className="dropdown__item">
        <span>{props.children}</span>
    </li>
    )
}

export default DropItem;