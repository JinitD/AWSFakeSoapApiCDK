import { Builder, parseString, processors } from "xml2js";
import { User } from "../model/User";

export class TransformBuilderXml {
  private namespace: string;
  private prefijo: string;
  private soap: string;

  constructor(namespace: string, prefijo: string, soap: string) {
    this.namespace = namespace; // http://demo8229239.mockable.io/service/1
    this.prefijo = prefijo; // sasf
    this.soap = soap; // http://schemas.xmlsoap.org/soap/envelope/
  }

  getResponseXml(xmlString: string, soapAction: string): User[] {
    try {
      const colum = soapAction === "getUsers" ? "ListUser" : "response";

      const options = {
        explicitArray: false,
        tagNameProcessors: [processors.stripPrefix],
      };

      let jsonResult: User[] = [];

      parseString(xmlString, options, (err, result) => {
        jsonResult = result["Envelope"]["Body"][colum];
      });

      return jsonResult;
    } catch (error) {
      console.log("getResponseXml ", error);
      throw error;
    }
  }

  buildXml(user: any): string {
    try {
      const soapEnvelope = {
        "soapenv:Envelope": {
          $: {
            "xmlns:soap": `${this.soap}`,
            "soapenv:encodingStyle": "http://www.w3.org/2001/12/soap-encoding",
          },
          "soapenv:Header": {},
          "soapenv:Body": {
            $: {
              "xmlns:sasf": `${this.namespace}`,
            },
            user,
          },
        },
      };

      const builder = new Builder({
        headless: true,
        renderOpts: { pretty: true },
      });

      return builder.buildObject(soapEnvelope);
    } catch (error) {
      console.log("buildXml ", error);
      throw error;
    }
  }
}
