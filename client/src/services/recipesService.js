const url = 'http://localhost:4000/api/recipes';
const token = localStorage.getItem('x-auth-token');



export const getAll = (category = '') => {
    let recipeUrl = url + ((category && category !== ' ') ? `?category=${category}` : ' ');

    return fetch(recipeUrl)
        .then(res => res.json())
        .catch(error => console.log(error));
};

export const create = (title, imageUrl, description, category, user) => {
    let recipe = {
        title,
        imageUrl,
        description,
        category,
        creator:user.id
    }
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(recipe)
    })
}


export const getOne = (recipeId) => {
    return fetch(`${url}/${recipeId}`)
        .then(res => res.json())
        .catch(error => console.log(error));
};

export const like = (recipeId, userId) => {
    return fetch(`${url}/like/${recipeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify({userId})
    })
        .then(res => res.json());
}

export const deleteRecipe = (recipeId) => {
    return fetch(`${url}/${recipeId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },       
    })
        .then(res => res.json());
}

export const update = (recipeId, recipe) => {
    return fetch(`${url}/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify(recipe)
    })
    .then(res=>res.json())
};

export const addToFavorite =(recipeId, userId)=>{
    return fetch(`${url}/favorite/${recipeId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization':token
        },
        body: JSON.stringify({userId})
    })
        .then(res => res.json());
}

export const getAllFavorite=(userId)=>{
    return fetch(`${url}/get-user-recipes-favorite/${userId}`)
    .then(res => res.json())
    .catch(error => console.log(error));
}

export const getAllOwn = (userId)=>{
    return fetch(`${url}/get-user-recipes/${userId}`)
    .then(res => res.json())
    .catch(error => console.log(error));
}

export const createComment = (content, recipeId, userId) => {
    let comment = {
        content,
        creator:userId,
        recipe:recipeId
    }
    return fetch(`${url}/${recipeId}/comments`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(comment)
    })
    .then(res => res.json());
}

export const getAllComments = (recipeId) => {   

    return fetch(`${url}/${recipeId}/comments`)
        .then(res => res.json())
        .catch(error => console.log(error));
};
