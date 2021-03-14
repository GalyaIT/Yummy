const router = require('express').Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const { isAuth } = require('../middlewares/auth');

router.get('/all', (req, res, next) => {
    Recipe.find()
        .then(recipes => {
            res.json(recipes);
            console.log(recipes);
        })
        .catch(next);
});

router.post('/', async (req, res, next) => {
    
    let recipe = new Recipe(req.body);
    User.findById(req.body._id)
        .then(user => {
            console.log(user);
            recipe.save()
                .then(createdRecipe => {
                    user.recipes.push(createdRecipe._id);
                    user.save();
                    return res.status(201).json({ _id: createdRecipe._id });
                })
        });

});


router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findById(id)
        .then(recipe => {
            res.json(recipe);
            console.log(recipe);
        })
        .catch(next);
});

router.get('/get-user-recipes/:id', (req, res, next) => {
    const userId = req.params.id;

    Recipe.find({})
        .where('creator')
        .equals(userId)
        .then(recipes => {
            res.send(recipes);
            console.log(recipes);
        })
        .catch(next);
});

router.post('/like/:id', (req, res, next) => {
    const id = req.params.id;
    const userId = req.body._id;
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


router.delete('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
        .then(() => {
            res.send("Successfuly removed");
        })
        .catch(next);
})

router.put('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    const { title, description, category } = req.body;  // 
    Recipe.findOneAndUpdate(id, { ...req.body }, { upsert: true }, function (err, recipe) {
        if (err) return res.send(500, { error: err });
        return res.send('Succesfully saved.');

    })
})

module.exports = router;