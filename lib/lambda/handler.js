const env = require('./env/env.conf')
const xmlResponseTransform = require('./layout/xmlResponseTransform')


exports.fakeSoapService = async (event) => {
    let xmlParser = '';
    try {
        const soapAction = event.headers.SoapAction;
        const json = event.body;

        if (json != null && soapAction == 'postUser') {
            xmlParser = creteByPlantilla(json);
        }

        return sendRequest(xmlParser, soapAction);
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Error en este procesos: ${error}`
            }),
        }
    }
}


function creteByPlantilla(json) {
    const SoapRequestBuilder = require('./layout/SoapRequestBuild');
    const soapBuilder = new SoapRequestBuilder(env.global.soapNamespace,
        env.global.prefijo, env.global.soapSchema);
    return soapBuilder.buildXml(JSON.parse(json));
}

async function sendRequest(xml, soapAction) {
    const postUserOptions = {
        method: "POST",
        body: xml,
        headers: {
            'Content-Type': 'text/xml;charset=UTF-8',
            'SOAPAction': `${soapAction}`,
        },
    };

    try {
        const response = await fetch(env.global.url, postUserOptions);
        const responseText = await response.text();
        const data = xmlResponseTransform.getResponseXml(responseText, soapAction)

        return {
            statusCode: 200,
            body: JSON.stringify(data),
        }
    } catch (error) {
        const data = { message: "error en sendRequest : " + error }
        return {
            statusCode: 500,
            body: JSON.stringify(data),
        };
    }

}


