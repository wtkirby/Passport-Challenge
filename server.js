var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require("path");
var mongoose = require('mongoose');

// Port to start server on
var port = process.env.PORT || 3000;

// Used for parsing json data in the request body.
app.use(bodyParser.json());
app.use(cookieParser());

// Middleware for logging server requests
app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

// Routes for Components
app.use('/api/factory', require('./components/factory/factory.router'));

// Static public folder
app.use('/', express.static('public'));

// Forward any unknown requests to index
app.get('*', function(req, res) {
    res.redirect('/');
    console.log('404 page not found. Redirected to index.html');
});


// Connect to mongodb
mongoose.connect('mongodb://admin:passport@ds119210.mlab.com:19210/passportchallenge');

// Wait for DB connection
mongoose.connection.once('open', () => {
    // Start server
    app.listen(port);
    console.log('Server started on port: ' + port);
});