
var pdfService = require("./../services/PdfService");

// Export

exports.getPdf = _getPdf;

function _getPdf (req, res) {
    pdfService.generatePdf(req, res)

}

