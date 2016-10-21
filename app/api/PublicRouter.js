/**
 * Created by plarboul on 13/04/2016.
 */

// Imports
var express = require('express');
var router = express.Router();
var UsersController = require("./controllers/UsersController");

// middleware specific to this router
router.use(function timeLog(req, res, next) {
    next();
});

router.get("/users/:id/picture",function(req,res) {
    UsersController.getPicture(req,res);
});

module.exports = router;