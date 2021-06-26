const router = require('express').Router();
const Recipe = require('../models/Recipe');
const User = require('../models/User');
const Comment = require('../models/Comment')
const { isAuth } = require('../middlewares/auth');


router.get('/search', (req, res, next) => {
    const {search}=req.query;
    console.log(search);
    const title = new RegExp(search, 'i')
    Recipe.find({title : title})
    .populate("creator", "username")
        .then(recipes => {
            res.json(recipes);
            console.log(recipes);
        })
        .catch(next);
});

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
    .populate('comments')
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

router.get('/get-user-recipes-favorite/:id', (req, res, next)=>{
    const userId = req.params.id;

   Recipe.find({})   
    .populate("creator", "username")
    .where('favorites').in(userId)
    .then(recipes=>{
       
        res.send(recipes);
            console.log(recipes);
            
    })
    .catch(next);   
})

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

    Recipe.findById(recipeId)
        .then(recipe => {
            recipe.favorites.push(userId);
            recipe.save();
            User.findById(userId)
            .then(user=>{
                user.favoriteRecipes.push(recipeId)
                user.save();
                console.log(user);

            })
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
    let updates = req.body;
    Recipe.findOneAndUpdate({ _id: req.params.id }, updates, { new: true })
      .then(updatedRecipe => res.json(updatedRecipe))
      .catch(err => res.status(400).json("Error: " + err))

})
//create comment
router.post('/:id/comments', async (req, res, next) => {
    const id = req.params.id;
    let comment = new Comment(req.body);
    Recipe.findById(id)
        .then(recipe => {
            console.log(recipe);
            comment.save()
                .then(createdComment => {
                    recipe.comments.push(createdComment._id);
                    recipe.save();
                    // console.log(recipe);
                    // console.log(createdComment);
                    return res.status(201).json(recipe);
                })
                .catch(e=>{
                    console.log(e);
                })
                
        });

});

//getAllComments
// router.get('/:id/comments', (req, res, next) => {
//     const id = req.params.id;
//     Recipe.findById(id)
//     .populate('comments')   
//         .then(recipe => {            
        
//                   res.json(recipe.comments);       
         
          
//             // console.log(recipe);
//         })
//         .catch(next);
// });


module.exports = router;