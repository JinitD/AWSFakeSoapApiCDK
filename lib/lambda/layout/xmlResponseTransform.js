const xml2js = require('xml2js');

function getResponseXml(xmlString, soapAction) {
    const colum = soapAction === "getUsers" ? "sasf:ListUser" : "sasf:response";
    const parser = new xml2js.Parser({ explicitArray: false });
    var json = {};
    parser.parseString(xmlString, (err, result) => {
        json = result['soapenv:Envelope']['soapenv:Body'][colum];
    });

    return json; //lo que devuelve el xml pero parseado a json
}

module.exports = {
    'getResponseXml': getResponseXml
}