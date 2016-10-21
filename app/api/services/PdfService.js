/**
 * Created by aarchamb on 12/04/2016.
 */

// Imports
var sizeOf = require('image-size');
var path = require("path");
var fs = require("fs");
var PDFDocument = require('pdfkit');
var Jimp = require("jimp");
var UsersController = require("../controllers/UsersController");
var fs = require('fs');
var confService = require("./../../utils/config/config");
var config = confService.getConf();

// Exports

exports.generatePdf = _generatePdf;

//Generate pdf

function _generatePdf(req, res, callback) {

        UsersController.getUsers(req,function (err, users) {

        doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(__dirname+'/../../resources/Trombi.pdf'));

        var datetime = new Date();
        var datePdf = datetime.getDate()+"/"+(datetime.getMonth()+1)+"/"+datetime.getFullYear()

        var picturePath = path.join(__dirname+'/../../resources/Default.png');

        var dimensions = sizeOf(picturePath);
        var scaleValue = 0.10; // valeur pour redimensionner les images

        var FinalPictureWidth = dimensions.width*scaleValue;
        var FinalPictureheight = dimensions.height*scaleValue;


        var mid = (doc.page.width/2)-100; // Milieu de la page

        marginLeft = 0;
        marginTop = 0;

        defaultMarginBorder = 50; // marges droite et gauche du pdf
        defaultMarginBorderTop = 90; // marge première page du haut du pdf

        defaultPaddingTop = 35; //espacement vertical entre  chaque photos
        defaultPaddingLeft = 10; //espacement horizontal entre  chaque photos
        topPositionLegend = FinalPictureheight + 5;

        doc.text('TROMBINOSCOPE NSC FS SBU NANTES',110, 30, {align: 'center', width: 400});
        doc.text(datePdf,320, 30, {align: 'center', width: 400}).fontSize(8);

        nbPagePdf = 1;
        doc.fontSize(9);

        doc.text(" page "+nbPagePdf,100, 700, {align: 'center', width: 400}).fontSize(8);

            for (indice in users) {

                user = users[indice];
                var picturePath = path.join(config.pathResized+user.picture)

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
                    picturePath = path.join(__dirname+'/../../resources/Default.png');
                }

                if(indice== 0){
                    marginLeft = defaultMarginBorder;
                    marginTop = defaultMarginBorderTop;
                }

                leftPositionLegend = marginLeft + FinalPictureWidth/2 - 5;

                 if(marginLeft+FinalPictureWidth+defaultMarginBorder > doc.page.width){
                    marginLeft = defaultMarginBorder;
                    marginTop = marginTop+FinalPictureheight+defaultPaddingTop;

                    //Gestion des prénoms /  noms sur trois lignes

//                    if(doc.widthOfString("Thomas Amiand") > 1.9 * FinalPictureWidth){
//                        marginTop = marginTop + 20;
//                    }

                }

                if(marginTop+150 > doc.page.height){
                  doc.addPage();
                  nbPagePdf = nbPagePdf +1;
                  doc.text(datePdf,320, 30, {align: 'center', width: 400}).fontSize(8);
                  doc.text(" page"+nbPagePdf,100, 700, {align: 'center', width: 400}).fontSize(8);
                  marginLeft = defaultMarginBorder;
                  marginTop = 20;
                }

                topPositionLegend = marginTop + FinalPictureheight + 5;

                doc.image(picturePath, marginLeft, marginTop,{scale: scaleValue})

                doc.text(user.firstName, marginLeft, topPositionLegend,{align: 'center', width: FinalPictureWidth});

                doc.text(user.lastName, marginLeft, topPositionLegend+8,{align: 'center', width: FinalPictureWidth});


                marginLeft = marginLeft + FinalPictureWidth + defaultPaddingLeft ;


           }

        doc.end();

        doc.pipe(res);

    });

}