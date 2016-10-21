/**
 * Created by tamiand on 05/07/2016.
 */
var expect = require('chai').expect;
var async = require('async');

var UsersDao = require('../app/database/UsersDao');


describe('Users service',function() {

    /*before(function (done) {
        UsersDao.getUserByID(
            'IDTest',
            function () {
                expect(err).to.not.exist;
                user = result;
                done();
            });
    });*/



    it('les morts ne racontent pas d histoires'), function () {
        var coco = true;
        expect(coco).to.equal(true);
    };


});