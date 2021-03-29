const CategoryItem =(props)=>{
    return(
        <li className="btn category-item">
      <span>{props.children}</span>
    </li>
    )
}

export default CategoryItem;