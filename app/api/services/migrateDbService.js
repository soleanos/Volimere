var UsersController = require("../controllers/UsersController");
var confService = require("./../../utils/config/config");

var path = require("path");
var fs = require("fs");
var config = confService.getConf();

exports.migrate = _migrate;

function _migrate(req, res, callback) {

   //Prend les utilisateurs de la BD  de l'ancienne version pour les reins�rer  avec les bonnes propri�t�s dans la nouvelle

   /*UsersController.getUsersPrd(function (err, users) {

            for (indice in users) {
                userPrd = users[indice];
                userPicture = userPrd.collabMatricule+'.jpg';

                var picturePath = path.join(config.pathResized+userPicture)

                function fileExists(picturePath){
                    try{
                        fs.accessSync(picturePath)
                        return true;
                    }catch(e){
                        return false;
                    }
                }

                var test = fileExists(picturePath);

                if(test == false){
                    userPicture = "Default.png";
                }

                newUser = {
                                "firstName": userPrd.first_name,
                                "lastName": userPrd.last_name,
                                "picture": userPicture,
                                "matricule": userPrd.collabMatricule,
                                "mail": userPrd.collabMail,
                                "startDate": userPrd.arrivalDate,
                                "updateDate": userPrd.updateDate,
                                "hasAccount": false,
                                "rank": "collaborator",
                }

                UsersController.createUserPrd(newUser);
           }

    });*/

     //Modifie les nom des anciennes photos pour les remplacer par le matricule des collaborateurs.

       UsersController.getUsers(req,function (err, users) {

             for (indice in users) {
                userPrd = users[indice];

                if(userPrd.picture){

                    fs.rename(config.pathResized+userPrd.picture,config.pathResized+userPrd.matricule+".jpg", function(err) {
                        if ( err ) console.log('ERROR: ' + err);
                    });
                }
            }
       });
}