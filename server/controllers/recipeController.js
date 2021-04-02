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

// router.get('/get-user-recipes/:id', (req, res, next) => {
//     const userId = req.params.id;

//     Recipe.find({})
//         .where('creator')
//         .equals(userId)
//         .then(recipes => {
//             res.send(recipes);
//             // console.log(recipes);
//         })
//         .catch(next);
// });

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


router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.send("Successfuly removed");
        })
        .catch(next);
})

router.put('/:id', (req, res, next) => {
    const id = req.params.recipeId;
    const { title, imageUrl, description, category } = req.body;  // 
    Recipe.findOneAndUpdate(id, {
        title: title, 
        imageUrl: imageUrl,
        description: description,      
        category: category
    }, { new: true }, function (err, recipe) {
        if (err) return res.send(500, { error: err });
        // return res.send('Succesfully saved.');
        return res.send(recipe);

    })
})

module.exports = router;