const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // email: {
    //     type: String,
    //     required: true
    // },
    recipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }],
    // likedRecipes: [{
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Recipe'
    // }],
    favoriteRecipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }],
});
userSchema.methods = {

    matchPassword: function (password) {
        return bcrypt.compare(password, this.password);
    }

};

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(this.password, salt, (err, hash) => {
                if (err) { next(err); return }
                this.password = hash;
                next();
            });
        });
        return;
    }
    next();
});

module.exports = mongoose.model('User', userSchema);