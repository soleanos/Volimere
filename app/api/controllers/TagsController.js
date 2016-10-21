/**
 * Created by tamiand on 12/04/2016.
 */

//Imports
var TagsService = require("./../services/TagsService");

// Exports
exports.insertTag = _insertTag;
exports.getTag = _getTag;
exports.addTagOnUser = _addTagOnUser;
exports.removeTag = _removeTag;
exports.getAllTags = _getAllTags;

function _insertTag(req, res, callback){
    TagsService.insertTag(req, res, callback);
}

function _getTag(req, res, callback){
    TagsService.getTag(req, res, callback);
}

function _addTagOnUser(req, res, callback){
    TagsService.addTagOnUser(req, res, callback);
}

function _removeTag(req, res, callback){
    TagsService.removeTag(req, res, callback);
}

function _getAllTags(req, res, callback){
    TagsService.getAllTags(req, res, callback);
}