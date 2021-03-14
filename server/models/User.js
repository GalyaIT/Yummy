const mongoose = require('mongoose');

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
    email: {
        type: String,
        required: true
    },
    recipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }],
    likedRecipes: [{
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    }],
});

module.exports = mongoose.model('User', userSchema);