/**
 * Created by tamiand on 12/04/2016.
 */

// Imports
var TagsDao = require ("./../../database/TagsDao");

// Exports
exports.insertTag = _insertTag;
exports.getTag = _getTag;
exports.addTagOnUser = _addTagOnUser;
exports.removeTag = _removeTag;
exports.getAllTags = _getAllTags;


// Private

//Create a new Tag
function _insertTag(req, res, callback){
    TagsDao.insertTag(req.body.name, callback);
}

//Get a tag info
function _getTag(req, res, callback){
    TagsDao.getTag(req.body.name, callback);
}

//Add a user matricule in the tag's list
function _addTagOnUser(req, res, callback){
    TagsDao.addTagOnUser(req.body.matricule, req.body.id, callback)
}

//Remove a tag
function _removeTag(req, res, callback){
    TagsDao.removeTag(req.body.id, callback);
}

// Get all the tag names
function _getAllTags (req, res, callback) {
    TagsDao.getAllTags(req, callback);
}