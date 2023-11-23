import fetch from "node-fetch";
import { environment } from "./env/environment";
import { TransformBuilderXml } from "./layout/TransformBuilderXml";

const soapBuilder: TransformBuilderXml = new TransformBuilderXml(
  environment.soapNamespace,
  environment.prefijo,
  environment.soapSchema
);

export const getRequest = async (event: any, context: any) => {
  let xmlParser = "";
  try {
    const soapAction = event.headers.SoapAction;
    const json = event.body;

    if (json != null && soapAction == "postUser") {
      xmlParser = soapBuilder.buildXml(json);
    }

    return sendRequest(xmlParser, soapAction);
  } catch (error) {
    console.error("mi error: ", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error la hacer este proceso: ${error}`,
      }),
    };
  }
};

async function sendRequest(xml: string, soapAction: string) {
  try {
    const postUserOptions = {
      method: "POST",
      body: xml,
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        SOAPAction: `${soapAction}`,
      },
    };

    const response = await fetch(environment.url, postUserOptions);
    const responseText = await response.text();
    const data = soapBuilder.getResponseXml(responseText, soapAction);
    return { body: JSON.stringify(data), statusCode: 200 };
  } catch (error) {
    console.log("sendRequest: ", error);
    return {
      body: JSON.stringify({ message: `Error en sendRequest: ${error}` }),
      statusCode: 500,
    };
  }
}
