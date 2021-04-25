const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
   title: {
        type: String,
        required: true,        
    },
    imageUrl:{
        type:String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Comment'
    }],
    
    
});

module.exports = mongoose.model('Recipe', recipeSchema);