const xml2js = require('xml2js');

class SoapRequestBuilder {

  constructor(namespace, prefijo, soap) {
    this.namespace = namespace;//http://demo8229239.mockable.io/service/1
    this.prefijo = prefijo;//sasf
    this.soap = soap; //http://schemas.xmlsoap.org/soap/envelope/
  }

  buildXml(user) {
    const soapEnvelope = {
      'soapenv:Envelope': {
        '$': {
          'xmlns:soap': `${this.soap}`,
          'soapenv:encodingStyle': 'http://www.w3.org/2001/12/soap-encoding'
        }, 
        'soapenv:Header': {},
        'soapenv:Body': {
          '$': {
            'xmlns:sasf': `${this.namespace}`
          },
          user
        }
      }
    }
    const builder = new xml2js.Builder({ //investigar como construir mas cositas aqui <-  
      headless: true,
      renderOpts: { pretty: true }
    });
    return builder.buildObject(soapEnvelope);
  }

}

module.exports = SoapRequestBuilder;
