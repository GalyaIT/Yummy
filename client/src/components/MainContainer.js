import CategoryTemplate from "./CategoryTemplate"
import soupImg from '../assets/images/soup.jpg';
import saladImg from '../assets/images/salad.jpg';
import mainImg from '../assets/images/skewers.jpg';
import dessertImg from '../assets/images/muffins.jpg';
import breadImg from '../assets/images/bread.jpg';


const MainContainer = () => {

    return (

        <div className="main-wrapper">
   
            <CategoryTemplate name ="Soups" img ={soupImg}/>
           
            <CategoryTemplate name ="Salads" img ={saladImg}/>
         
            <CategoryTemplate name ="Main Dishes" img ={mainImg}/>
          
            <CategoryTemplate name ="Desserts" img ={dessertImg}/>
           
            <CategoryTemplate name ="Bread" img ={breadImg}/>

        </div>
    )
}

export default MainContainer;