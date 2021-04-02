const url = 'http://localhost:5000/api/recipes';




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
        },       
    })
        .then(res => res.json());
}

export const update = (recipeId, recipe) => {
    return fetch(`${url}/${recipeId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe)
    });
};
