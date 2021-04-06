const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config= require('../config/config');
const { auth, createToken } = require('../middlewares/auth');


router.post('/register', auth, (req, res, next) => {
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
            next({ status: 409, message: 'Username already exists!', type: 'ERROR' })
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


router.get('/verify', (req, res, next) => {

    let authorization = req.headers.authorization || '';
    if (authorization) {
        try {          
            console.log(authorization);
            // if (authorization[0] !== 'Bearer') {
            //     return res.status(401).send();
            // } else {
            let  decoded = jwt.verify(authorization, config.SECRET);
              req.user = decoded;
              User.findById(req.user.id)
              .then((user) => {
                return res.send({
                  status: true,
                  user
                })
            });             
                // return next();
            // }
        } catch (err) {
            return res.status(403).send();
        }
    } else {
        return res.status(401).send();
    }   
})




router.post('/logout', (req, res, next)=>{
    const token = req.cookies[config.COOKIE_NAME]; //CHECK
    console.log(token);
    res.clearCookie(config.COOKIE_NAME).send('Logout successfully!');
})

router.get('/', (req, res, next) => {
    User.find()
    .populate('recipes')
        .then((users) => {            
            res.send(users);
        })
        .catch(next)
}),


// router.get('/:id', (req, res, next) => {
//     const userId = req.params.id;    
   
//     User.findById()   
//         .then((user) => {  
//             console.log(user);         
//             res.send(user);
//         })
//         .catch(next)
// }),

module.exports = router;