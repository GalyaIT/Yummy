const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config= require('../config/config');
const { auth, createToken } = require('../middlewares/auth');


router.post('/register', auth, (req, res) => {
    // TODO: Check if user exists

    let user = new User(req.body);

    user.save()
        .then(createdUser => {
            console.log(createdUser);
            const token = createToken({ id: createdUser._id, username: createdUser.username });                   
            res.header('Authorization', token).status(201).send(createdUser)
            // res.status(201).json({ _id: createdUser._id });
        })
        .catch((err) => {
            console.log(err);
        });

});

router.post('/login', auth, (req, res, next) => {
    const { username, password } = req.body;

    User.findOne({ username })
        .then((user) => Promise.all([user, user.matchPassword(password)]))
        .then(([user, match]) => {
            if (!match) {
                res.status(401).send('Invalid password');
                return;
            }           
            const token = createToken({ id: user._id, username: user.username });
            res.header('Authorization', token).send(user)
        })
        .catch(err => {
            next({ status: 404, message: 'No such user or password!', type: 'ERROR' })
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