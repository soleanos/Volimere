/**
 * Created by plarboul on 23/12/2015.
 */

// Imports
var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer = require('multer');
var UsersController = require("./controllers/UsersController");
var AuthenticationController = require("./controllers/AuthenticationController");
var pdfController = require("./controllers/PdfController");
var ldapController = require('./controllers/LDAPController');
var TagsController = require('./controllers/TagsController');
var migration = require("./services/migrateDbService");
var confService = require("./../utils/config/config");
var config = confService.getConf();
var Jimp = require("jimp");


// middleware specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

// define the home page route
router.get('/', function(req, res) {
    res.send('trombi home page');
});

// Logout
router.get("/logout", function (req,res) {
    res.json("Logout");
    // TODO
});

// get all the users
router.get('/users/:id?/:filter1?/:filter2?', function(req, res) {
    UsersController.getUsers(req,function (err, users) {
        if (err) res.status(err.code).json(err.message);
        res.status(200).json(users);
    });
});

// Create new user
router.post("/user/create", function (req, res) {
    UsersController.createUser(req, res);
});

// Update user
router.post("/user/update/", function (req, res) {
    UsersController.updateUser(req, res, function (err, user) {
        if (err) res.status(err.code).json(err.message);
        res.status(200).json(user);
    });
});

// Delete user
router.delete("/user/remove", function (req, res) {
    UsersController.deleteUser(req, res);
});

router.get("/api/tags", function(req, res){
    TagsController.getAllTags(req, res);
});

// search one user
router.get("/user/:id", function (req, res) {
     UsersController.getUser(req,function (err, user) {
        if (err) res.status(err.code).json(err.message);
        res.status(200).json(user);
    });
});

router.get("/store", function(req, res) {
    AuthenticationController.getStoredUser(req, function (err, user) {
        if (err) res.status(err.code).json(err.message);
        res.status(200).json(user);
    });
});

// Upload picture
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.path)
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});

var upload = multer({ storage: storage })

router.post("/picture/upload/",upload.any(), function (req, res) {
    upload.single(req.files);
    if(req.files[0].originalname){
        pictureName = req.files[0].originalname;
        Jimp.read(config.path+pictureName, function (err, lenna) {
            if (err) throw err;
            lenna.resize(640, 480)            // resize
                 .quality(60)                 // set JPEG quality
                 .write(config.pathResized+pictureName); // save
        });
    }
    res.status(200).send("OK");

});

// Upload Orga

var storageOrga = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, config.pathOrga)
    },
    filename: function (req, file, cb) {
        cb(null,file.originalname)
    }
});

var uploadOrga = multer({ storage: storageOrga })

router.post("/organigramme/upload/",uploadOrga.any(), function (req, res) {
    upload.single(req.files);
    res.status(200).send("OK");
});


// get one user

router.get("/user/:id/picture",function(req,res) {
    UsersController.getPicture(req,res);
});

//get chart

router.get("/chart", function (req, res) {
    UsersController.getChart(req, res);
});

//get PDF

router.get("/pdf/:id?/:filter1?/:filter2?", function (req, res) {
    pdfController.getPdf(req, res);
});

//ldap search

router.get("/search/:lastName", function (req, res) {
    ldapController.searchLDAP(req, res);
 });


//migration old trombi to new ( db + rename picture  )

router.get("/bd/migrate", function (req, res) {
    migration.migrate(req, res);
});

router.post("/logout", function (req,res) {

    AuthenticationController.logout(req, res);
});

module.exports = router;