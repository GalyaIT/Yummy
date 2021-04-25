const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  
    content: {
        type: String,
        required: true
    },  
    createdAt:{
        type: Date,        
        required: true,
        default: Date.now 
    },     
    creator: {
        type: String,
        required: true
    },
    recipe: {
        type: mongoose.Types.ObjectId,
        ref: 'Recipe'
    },
   
});

module.exports = mongoose.model('Comment', commentSchema);