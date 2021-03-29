const express = require('express');
const cors = require('cors');
const { auth } = require('../middlewares/auth');

module.exports = function (app) {
    app.use('/static', express.static('public'));
    app.use(express.urlencoded({ extended: true }));     
    
    app.use(express.json()); 
    app.use(auth);
}
