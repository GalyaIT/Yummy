const router = require('express').Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { isAuth } = require('../middlewares/auth');

// router.get('/all', (req, res, next) => {
//     Recipe.find()
//         .then(recipes => {
//             res.json(recipes);
//             console.log(recipes);
//         })
//         .catch(next);
// });


router.get('/',  (req, res, next) => {
    const category = req.query.category ? req.query.category : ' ';
    console.log(category);
    if (category !== ' ') {
        Recipe.find({ category: category })
            .populate("creator", "username")
            .then(recipes => {
                res.json(recipes);
                // console.log(recipes);
            })
            .catch(next);
    } else {
        Recipe.find()
            .populate("creator", "username")
            .then(recipes => {
                res.json(recipes);
                // console.log(recipes);
            })
            .catch(next);
    }
});

router.post('/', async (req, res, next) => {

    let recipe = new Recipe(req.body);
    User.findById(req.body.creator)
        .then(user => {
            // console.log(user);
            recipe.save()
                .then(createdRecipe => {
                    user.recipes.push(createdRecipe._id);
                    user.save();
                    // console.log(user);
                    // console.log(createdRecipe);
                    return res.status(201).json(createdRecipe);
                })
                .catch(e=>{
                    console.log(e);
                })
                
        });

});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id)
    .populate("creator", "username")
        .then(recipe => {
            res.json(recipe);
            // console.log(recipe);
        })
        .catch(next);
});

router.get('/get-user-recipes/:id', (req, res, next) => {
    const userId = req.params.id;

    Recipe.find({})
        .where('creator')
        .equals(userId)
        .populate("creator", "username")
        .then(recipes => {
            res.send(recipes);
            console.log(recipes);
        })
        .catch(next);
});

router.patch('/like/:id', (req, res, next) => {
    const id = req.params.id;
    
    const userId = req.body.userId;
    console.log(userId);
    console.log(id);

    Recipe.findById(id)
        .then(recipe => {
            recipe.likes.push(userId);
            recipe.save();
            res.json(recipe);
            console.log(recipe);
        })
        .catch(next);
});

router.patch('/favorite/:id', (req, res, next) => {
    const recipeId = req.params.id;
    
    const userId = req.body.userId;
    console.log(userId);
    console.log(recipeId);

    User.findById(userId)
        .then(user => {
            user.favoriteRecipes.push(recipeId);
            user.save();
            res.json(user);
            console.log(user);
        })
        .catch(next);
});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.send("Successfuly removed");
        })
        .catch(next);
})

router.put('/:id', (req, res, next) => {
    let updates = req.body;
    Recipe.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
      .then(updatedRecipe => res.json(updatedRecipe))
      .catch(err => res.status(400).json("Error: " + err))

})
module.exports = router;