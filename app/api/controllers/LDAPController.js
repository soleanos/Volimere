/**
 * Created by plarboul on 26/04/2016.
 */


var LDAPService = require('./../services/LDAPService'); 
//var LDAPService = require('./../services/LDAPTest');

exports.searchLDAP = _searchLDAP;

function _searchLDAP (req, res) {
    LDAPService.searchLDAP(req, res);
//    LDAPTest.searchLDAP(req, res);
}