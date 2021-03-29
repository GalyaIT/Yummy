const url = 'http://localhost:5000/api/recipes';




export const getAll = (category='') => {
    let recipeUrl = url + ((category && category !== ' ') ? `?category=${category}` : ' ');

   return  fetch(recipeUrl)
        .then(res => res.json())
        .catch(error => console.log(error));
}