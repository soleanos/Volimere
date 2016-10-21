/**
 * Created by plarboul on 12/04/2016.
 */

var confService = require("./../utils/config/config");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var config = confService.getConf();

var url = config.dbUrl;
var urlPrd = config.oldDbUrl;

exports.getUsers = _getUsers;
exports.getUsersPrd = _getUsersPrd;
exports.createUser = _createUser;
exports.createUserPrd = _createUserPrd;
exports.deleteUser = _deleteUser;
exports.updateUser = _updateUser;

exports.getUserByID = getUserByID;
exports.getUserByLogin = getUserByLogin;
exports.getUserByOnlyLogin = getUserByOnlyLogin;

exports.getStoredUser = getStoredUser;
exports.logout = logout();

var connectedUser = [];

// Get all the users
function _getUsers (req,callback) {
    MongoClient.connect(url, function(err, db) {
        _findUsers(req,db, callback);
    });
}

var _findUsers = function(req,db, callback) {

    // 0 -> ordre alphabetique 1-> date d'arrivé, 2 -> sans photo, 3 -> nom ou prenom, 4 nom et prenom

    var filter = "";
    var filterWithValue = false;
    var IdfilterChoice = req.params.id;
    if (IdfilterChoice == 3 && !req.params.filter1) {
        IdfilterChoice = 0;
    }
    var value = "";
    var value2 = "";
    var nbFields = 0;

    if (IdfilterChoice == 1) {
        filter = "startDate";
    } else if (IdfilterChoice == 2) {
        filterWithValue = true;
        filter = "picture";
        nbFields = 1;
        value = "Default.png";
    } else if (IdfilterChoice == 3) {
        filterWithValue = true;
        nbFields = 2;
        value = req.params.filter1;
    } else if (IdfilterChoice == 4) {
        filterWithValue = true;
        nbFields = 2;
        value = req.params.filter1;
        value2 = req.params.filter2;
    } else {
        filter = "lastName";
    }

    if (filterWithValue == true) {
        if (nbFields == 2) {

            var query1 = {};
            var query2 = {};

            query1['firstName'] = new RegExp(value, 'i');

            if (IdfilterChoice == 4) {
                query2['lastName'] = new RegExp(value2, 'i');

                db.collection('users').find({$and: [query1, query2]}).toArray(function (err, users) {
                    if (err) throw err;
                    callback(err, users);
                });

            } else {
                query2['lastName'] = new RegExp(value, 'i');

                db.collection('users').find({$or: [query1, query2]}).toArray(function (err, users) {
                    if (err) throw err;
                    callback(err, users);
                });
            }

        } else {
            var query = {};
            query[filter] = new RegExp(value, 'i');
            db.collection('users').find(query).toArray(function (err, users) {
                if (err) throw err;
                callback(err, users);
            });
        }

    } else if (filter == 'startDate') {
        db.collection('users').find().sort({startDate: -1}).toArray(function (err, users) {
            if (err) throw err;
            callback(err, users);
        });
    } else {
        db.collection('users').find({}, {"sort": filter}).toArray(function (err, users) {
                if (err) throw err;
                callback(err, users);
            }
        );
    }
};

function _getUsersPrd (callback) {
    MongoClient.connect(urlPrd, function(err, db) {
        _findUsersPrd(db, callback);
    });
}

var _findUsersPrd = function(db, callback) {
    db.collection('people').find().toArray(function(err, users) {
        if (err) throw err;
        callback(err, users);
    });
};

// Create new user
function _createUser  (req, callback) {
    MongoClient.connect(url, function(err, db) {
        _insertUser(req, db, callback);
    });
}

var _insertUser = function(req, db, callback) {
    console.log(req.body);
    db.collection('users').insertOne({
        "firstName": req.body.firstname,
        "lastName": req.body.lastname,
        "picture": req.body.picture,
        "matricule": req.body.matricule,
        "mail": req.body.mail,
        "startDate": new Date(req.body.startdate),
        "updateDate": "",
        "hasAccount": false,
        "rank": "collaborator",
        "login": req.body.login,
        "password": req.body.login
    }, function(err, result){
        assert.equal(err, null);
        console.log("Inserted a document into the users collection.");
        callback;
    });
};

function _createUserPrd  (req, callback) {
    MongoClient.connect(url, function(err, db) {
        _insertUserPrd(req, db, callback);
    });
}

var _insertUserPrd = function(req, db, callback) {
    db.collection('users').insertOne(req, function(err, result){
        assert.equal(err, null);
        console.log("Inserted a document into the users collection.");
        callback;
    });
};

//delete a user
function _deleteUser(req, callback){
    MongoClient.connect(url, function(err, db){
        _removeUser(req, db, callback);
    })
}

var _removeUser = function(req, db, callback){
    matriculeUser = req.query.matricule;
    db.collection('users').remove(
        {"matricule" : matriculeUser},
        function(err,numberRemoved){
            console.log("inside remove call back" + numberRemoved);
    });
};

// Update an user

function _updateUser(req, callback){
    MongoClient.connect(url, function(err, db){
        _updateOneUser(req, db, callback);
    })
}

function _updateOneUser(req,db, callback){
    var idUser = new ObjectId(req.body._id);

    db.collection('users').updateOne(
        {"_id" : idUser},
        {
            $set: {
                "rank": req.body.rank,
                "lastName": req.body.lastName,
                "firstName": req.body.firstName,
                "tags" : req.body.tags,
                "hasAccount" : req.body.hasAccount,
            }
        }, function(err, results) {
            callback(err, results);
        });

}
//return one User identified by id
function getUserByID(req, callback){
    MongoClient.connect(url, function(err, db) {
            _getUserByID(req,db, callback);
    });
}

var _getUserByID = function(req, db, callback){
    db.collection('users').find({"matricule":req.params.id}).toArray(function(err, user) {
        if(user.length ==0) callback(err,null);
        else callback(err, user);
    });
};

// return one user if login and password let it
function getUserByLogin (login, password, callback) {
    MongoClient.connect(url, function(err, db){
        _getUserByLogin(login, password, db, callback);
    })
}

var _getUserByLogin = function (login, password, db, callback) {
    db.collection('users').find({"login":login, "password":password}).toArray(function(err, user) {
        if(user.length ==0) callback(err,null);
        else {
            var userToAdd = {};
            userToAdd._id = user[0]._id;
            userToAdd.rank = user[0].rank;
            userToAdd.login = login;
            connectedUser.push(userToAdd);
            callback(err, user);
        }
    });
};
function getStoredUser (req, callback) {
    _getStoredUser(req,callback);
}
var _getStoredUser = function(req, callback){
    callback(null, connectedUser);
};

// return one user if login and password let it
function getUserByOnlyLogin (login, callback) {
    MongoClient.connect(url, function(err, db){
        _getUserByOnlyLogin(login, db, callback);
    })
}

var _getUserByOnlyLogin = function (login, db, callback) {
    db.collection('users').find({"login":login}).toArray(function(err, user) {
        if(user.length ==0) callback(err,null);
        else callback(err, user);
    });
};

function logout () {
    connectedUser = {};
}