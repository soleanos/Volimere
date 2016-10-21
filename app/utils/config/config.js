exports.getConf = _getConf
var path = require("path");
var fs = require("fs");

function _getConf (callback) {

    // La variable confJson est à modifier selon le contexte de déploiement, "local.js" pour le dev local,
    //                          "prod.json" pour la production et "dev.json" pour la dev.

    var confJson = "local.json";
    var config = JSON.parse(fs.readFileSync(__dirname+'/../../utils/config/'+confJson, 'utf8'));
    return config;
};
