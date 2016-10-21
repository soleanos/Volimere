/**
 * Created by plarboul on 11/04/2016.
 */

var http = require('http');
var express = require('express');
var path = require('path');
var fs = require('fs');
var multer = require('multer');

var favicon = require('serve-favicon');
//var session = require('express-session');
var bodyParser = require('body-parser');
//var passport = require('passport');
//var localStrategy = require('passport-local').Strategy;
var AuthenticationController = require("./api/controllers/AuthenticationController");

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.use(favicon(__dirname + '/resources/favicon.ico'));
//app.use(session({ resave: true,
//    saveUninitialized: true,
//    secret: 'uwotm8' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../public'));

//require(__dirname+'/utils/config/passport.js')(passport, app);
//app.use(session({ secret: 'trombiSecret'}));
//app.use(passport.initialize());
//app.use(passport.session());

var router = require('./api/Router');
app.use('/api', router);

// Login
app.post("/api/login/", function (req,res) {

//    passport.authenticate('local-login');

    AuthenticationController.login(req, function (err, user) {
        if (err) res.status(err.code).json(err.message);
        if (user != null)  res.status(200).json(user);
        else res.status(403).json("Incorrect login and/or password");
    });
});

app.post("/api/store", function (req, res) {
    AuthenticationController.storeUser(req, function (err, user){
        if (err) res.status(err.code).json(err.message);
        res.status(200).json(user);
    })
});

var publicRouter = require('./api/PublicRouter');
app.use('/public-api', publicRouter);

app.listen(app.get('port'), function(){
    console.log('TROMBI_V2 started, listening on port ' + app.get('port'));
    if(process.env.PORT){console.log("Le port de la base de donnée utilisée est : "+process.env.DBPORT)}
});

module.exports.app = app;