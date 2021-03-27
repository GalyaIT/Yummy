const CategoryItem =(props)=>{
    return(
        <li className="btn">
      <span>{props.children}</span>
    </li>
    )
}

export default CategoryItem;