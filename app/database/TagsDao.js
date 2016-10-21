/**
 * Created by tamiand on 12/04/2016.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/TrombiDB';

exports.insertTag = _insertTag;
exports.getTag = _getTag;
exports.addTagOnUser = _addTagOnUser;
exports.removeTag = _removeTag;
exports.getAllTags = _getAllTags;

//Insert a new tag
function _insertTag(tagName, callback){
    MongoClient.connect(url, function(db, err){
        assert.equal(null, err);
        _addTag(tagName, db, callback);
    });
}

var _addTag = function(tagName, db, callback){
    db.collection('tags').insertOne( {
        "name" : tagName,
        "usersMatricule" : [ ]
        }, function(err, result){
            assert.equal(err, null);
            console.log("Inserted a document into the tags collection.");
            callback();
    });
}; 

//Return info on a tag according to the tagName
function _getTag(tagName, callback){
    MongoClient.connect(url, function(db, err){
        assert.equal(null, err);
        _findTag(tagName, db, callback);
    });
}

var _findTag = function(tagName, db, callback){
    var cursor = db.collection('tags').find({"name":tagName});
    cursor.each(function(err, doc) {
        if(err == null){
            callback(null, doc);
        }
        else{
            callback(err, null);
        }
    });
};

//Add a user matricule to the tag list
function _addTagOnUser(matricule, idTag, callback){
    MongoClient.connect(url, function(db, err){
        assert.equal(null, err);
        _addMatriculeToTagList(matricule, idTag, db, callback);
    });
}

var _addMatriculeToTagList = function(matricule, idTag, db, callback){
    var cursor = db.collection('tags').find({ _id : idTag });
    cursor.each(function(err, doc) {
        if(err == null){
            var matricules = doc["usersMatricule"];
            matricule.push(matricule);
            db.collection('tags').updateOne(
                {_id : idTag},
                {
                    $set: {"usersMatricule":matricules}
                }, function(err, results) {
                    console.log(results);
                    callback();
                }
            )
        }
        else {
            callback(err, null);
        }
    });
};

//Remove a tag
function _removeTag(idTag, callback){
    MongoClient.connect(url, function(db, err){
        assert.equal(null, err);
        _delTag(idTag, db, callback);
    });
}

var _delTag = function(idTag, db, callback){
    db.collection('tags').deleteOne(
        {_id : idTag},
        function(err, results) {
            console.log(results);
            callback();
        }
    );
};

//Returns all tag names
function _getAllTags(callback){
    MongoClient.connect(url, function(db, err){
       assert.equal(null, err);
        _allTagNames(db, callback);
    });
}

var _allTagNames = function(db, callback){

    db.collection('users').find()

    /*db.collection('tags').find().toArray(function(tags, err){
        if(err) throw err;
        callback(err, tags);
    });*/
};