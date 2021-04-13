import {useState, useEffect } from 'react'
import * as recipesService from '../../services/recipesService'

import CategoryTemplate from "./CategoryTemplate"
import soupImg from '../../assets/images/soup.jpg';
import saladImg from '../../assets/images/salad.jpg';
import mainImg from '../../assets/images/skewers.jpg';
import dessertImg from '../../assets/images/muffins.jpg';
import breadImg from '../../assets/images/bread.jpg';


const MainContainer = () => {

    const [soups, setSoups] = useState([])
    const [salads, setSalads] = useState([])
    const [mainDishes, setMainDishes] = useState([])
    const [desserts, setDesserts] = useState([])
    const [bread, setBread] = useState([])

    useEffect(() => {
        recipesService.getAll()
            .then(res => {               
                const soups = res.filter(x => x.category === 'Soups')
                setSoups(soups)
                const salads = res.filter(x => x.category === 'Salads')
                setSalads(salads)
                const mainDishes = res.filter(x => x.category === 'Main-dishes')
                setMainDishes(mainDishes)
                const desserts = res.filter(x => x.category === 'Desserts')
                setDesserts(desserts)
                const bread = res.filter(x => x.category === 'Bread')
                setBread(bread)
            })

    }, [])

    return (

        <div className="main-wrapper">
            <CategoryTemplate recipes={soups} name="Soups" img={soupImg} />
            <CategoryTemplate recipes={salads} name="Salads" img={saladImg} />
            <CategoryTemplate recipes={mainDishes} name="Main Dishes" img={mainImg} />
            <CategoryTemplate recipes={desserts} name="Desserts" img={dessertImg} />
            <CategoryTemplate recipes={bread} name="Bread" img={breadImg} />
        </div>
    )
}
export default MainContainer;