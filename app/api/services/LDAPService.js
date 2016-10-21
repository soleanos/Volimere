/**
 * Created by plarboul on 28/04/2016.
 */

var async = require('async');
var http = require('client-http');

exports.searchLDAP = _searchLDAP;


var connected = false;
var cookieGlobal;
var headersGlobal;

function _searchLDAP (req, res) {
    async.waterfall([
        function (cb) {
            if (connected == false) {
                http.get('http://frpar-nte-exoteam:9006/Staffing4Devs/api/signin?username=AdminExoTeam&password=ExAdmin', function (data, err, cookie, headers) {
                    if (err) {
                        cb(err);
                    }
                    connected = true;
                    cookieGlobal = cookie;
                    headersGlobal = headers;
                    cb(null, cookie, headers);
                });
            } else {
                cb(null, cookieGlobal, headersGlobal);
            }
        },
        function (cookie, headers, cb) {
            setTimeout(function() {
                http.request('http://frpar-nte-exoteam:9006/Staffing4Devs/api/employees?query='+req.params.lastName + '&cost=0',
                    function (data, err) {
                        if (err) { console.log(err);}
                        else {
                            // console.log(JSON.parse(data));
                            res.status(200).send(JSON.parse(data).slice(0,50))
                        }
                    }, null, {Cookie: 'JSESSIONID=' + (cookie.JSESSIONID)})
            }, 10000, 'FINISHED');
        }
    ], function ( data) { // Callback for water fall
        //console.log(data);
    });

}