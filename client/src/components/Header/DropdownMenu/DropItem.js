const DropItem =(props)=>{
    return(
        <li className="dropdown__item">
        <span className={props.className}>{props.children}</span>
    </li>
    )
}

export default DropItem;