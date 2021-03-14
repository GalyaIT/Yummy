const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config= require('../config/config')

router.post('/register', (req, res, next) => {
    // TODO: Check if user exists
    let user = new User(req.body);

    user.save()
        .then(createdUser => {
            console.log(createdUser);
            res.status(201).json({_id: createdUser._id});
        }).catch(next);

});
router.post('/login', (req, res, next) => {
    const {login: username, password} = req.body; 

    User.where({username, password})
        .findOne()
            .then(user => {
                let token = jwt.sign({
                    _id: user._id,
                    username: user.username,
                }, config.SECRET, { expiresIn: '1h'});

                res.status(200).json({
                    _id: user._id,
                    username: user.username,
                    token
                })
            })
            .catch(err => {
                next({status: 404, message: 'No such user or password!', type: 'ERROR'})
            })
});


router.post('/logout', (req, res, next)=>{
    const token = req.cookies[config.COOKIE_NAME]; //CHECK
    console.log(token);
    res.clearCookie(config.COOKIE_NAME).send('Logout successfully!');
})

router.get('/all', (req, res, next) => {
    User.find()
    .populate('recipes')
        .then((users) => {            
            res.send(users);
        })
        .catch(next)
}),


module.exports = router;