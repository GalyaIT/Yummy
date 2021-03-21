const CategoryItem =(props)=>{
    return(
        <li className="btn btn-card">
      <span>{props.children}</span>
    </li>
    )
}

export default CategoryItem;