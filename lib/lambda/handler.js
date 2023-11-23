"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequest = void 0;
const node_fetch_1 = require("node-fetch");
const environment_1 = require("./env/environment");
const TransformBuilderXml_1 = require("./layout/TransformBuilderXml");
const soapBuilder = new TransformBuilderXml_1.TransformBuilderXml(environment_1.environment.soapNamespace, environment_1.environment.prefijo, environment_1.environment.soapSchema);
const getRequest = async (event, context) => {
    let xmlParser = "";
    try {
        const soapAction = event.headers.SoapAction;
        const json = event.body;
        if (json != null && soapAction == "postUser") {
            xmlParser = soapBuilder.buildXml(json);
        }
        return sendRequest(xmlParser, soapAction);
    }
    catch (error) {
        console.error("mi error: ", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Error la hacer este proceso: ${error}`,
            }),
        };
    }
};
exports.getRequest = getRequest;
async function sendRequest(xml, soapAction) {
    try {
        const postUserOptions = {
            method: "POST",
            body: xml,
            headers: {
                "Content-Type": "text/xml;charset=UTF-8",
                SOAPAction: `${soapAction}`,
            },
        };
        const response = await (0, node_fetch_1.default)(environment_1.environment.url, postUserOptions);
        const responseText = await response.text();
        const data = soapBuilder.getResponseXml(responseText, soapAction);
        return { body: JSON.stringify(data), statusCode: 200 };
    }
    catch (error) {
        console.log("sendRequest: ", error);
        return {
            body: JSON.stringify({ message: `Error en sendRequest: ${error}` }),
            statusCode: 500,
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQStCO0FBQy9CLG1EQUFnRDtBQUNoRCxzRUFBbUU7QUFFbkUsTUFBTSxXQUFXLEdBQXdCLElBQUkseUNBQW1CLENBQzlELHlCQUFXLENBQUMsYUFBYSxFQUN6Qix5QkFBVyxDQUFDLE9BQU8sRUFDbkIseUJBQVcsQ0FBQyxVQUFVLENBQ3ZCLENBQUM7QUFFSyxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsS0FBVSxFQUFFLE9BQVksRUFBRSxFQUFFO0lBQzNELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUNuQixJQUFJO1FBQ0YsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7UUFDNUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUV4QixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksVUFBVSxJQUFJLFVBQVUsRUFBRTtZQUM1QyxTQUFTLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUVELE9BQU8sV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztLQUMzQztJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkMsT0FBTztZQUNMLFVBQVUsRUFBRSxHQUFHO1lBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxnQ0FBZ0MsS0FBSyxFQUFFO2FBQ2pELENBQUM7U0FDSCxDQUFDO0tBQ0g7QUFDSCxDQUFDLENBQUM7QUFwQlcsUUFBQSxVQUFVLGNBb0JyQjtBQUVGLEtBQUssVUFBVSxXQUFXLENBQUMsR0FBVyxFQUFFLFVBQWtCO0lBQ3hELElBQUk7UUFDRixNQUFNLGVBQWUsR0FBRztZQUN0QixNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxHQUFHO1lBQ1QsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBRSx3QkFBd0I7Z0JBQ3hDLFVBQVUsRUFBRSxHQUFHLFVBQVUsRUFBRTthQUM1QjtTQUNGLENBQUM7UUFFRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUEsb0JBQUssRUFBQyx5QkFBVyxDQUFDLEdBQUcsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUMvRCxNQUFNLFlBQVksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDO0tBQ3hEO0lBQUMsT0FBTyxLQUFLLEVBQUU7UUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNwQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxPQUFPLEVBQUUseUJBQXlCLEtBQUssRUFBRSxFQUFFLENBQUM7WUFDbkUsVUFBVSxFQUFFLEdBQUc7U0FDaEIsQ0FBQztLQUNIO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBmZXRjaCBmcm9tIFwibm9kZS1mZXRjaFwiO1xyXG5pbXBvcnQgeyBlbnZpcm9ubWVudCB9IGZyb20gXCIuL2Vudi9lbnZpcm9ubWVudFwiO1xyXG5pbXBvcnQgeyBUcmFuc2Zvcm1CdWlsZGVyWG1sIH0gZnJvbSBcIi4vbGF5b3V0L1RyYW5zZm9ybUJ1aWxkZXJYbWxcIjtcclxuXHJcbmNvbnN0IHNvYXBCdWlsZGVyOiBUcmFuc2Zvcm1CdWlsZGVyWG1sID0gbmV3IFRyYW5zZm9ybUJ1aWxkZXJYbWwoXHJcbiAgZW52aXJvbm1lbnQuc29hcE5hbWVzcGFjZSxcclxuICBlbnZpcm9ubWVudC5wcmVmaWpvLFxyXG4gIGVudmlyb25tZW50LnNvYXBTY2hlbWFcclxuKTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRSZXF1ZXN0ID0gYXN5bmMgKGV2ZW50OiBhbnksIGNvbnRleHQ6IGFueSkgPT4ge1xyXG4gIGxldCB4bWxQYXJzZXIgPSBcIlwiO1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBzb2FwQWN0aW9uID0gZXZlbnQuaGVhZGVycy5Tb2FwQWN0aW9uO1xyXG4gICAgY29uc3QganNvbiA9IGV2ZW50LmJvZHk7XHJcblxyXG4gICAgaWYgKGpzb24gIT0gbnVsbCAmJiBzb2FwQWN0aW9uID09IFwicG9zdFVzZXJcIikge1xyXG4gICAgICB4bWxQYXJzZXIgPSBzb2FwQnVpbGRlci5idWlsZFhtbChqc29uKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2VuZFJlcXVlc3QoeG1sUGFyc2VyLCBzb2FwQWN0aW9uKTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5lcnJvcihcIm1pIGVycm9yOiBcIiwgZXJyb3IpO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc3RhdHVzQ29kZTogNTAwLFxyXG4gICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgbWVzc2FnZTogYEVycm9yIGxhIGhhY2VyIGVzdGUgcHJvY2VzbzogJHtlcnJvcn1gLFxyXG4gICAgICB9KSxcclxuICAgIH07XHJcbiAgfVxyXG59O1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2VuZFJlcXVlc3QoeG1sOiBzdHJpbmcsIHNvYXBBY3Rpb246IHN0cmluZykge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBwb3N0VXNlck9wdGlvbnMgPSB7XHJcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgIGJvZHk6IHhtbCxcclxuICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwidGV4dC94bWw7Y2hhcnNldD1VVEYtOFwiLFxyXG4gICAgICAgIFNPQVBBY3Rpb246IGAke3NvYXBBY3Rpb259YCxcclxuICAgICAgfSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbnZpcm9ubWVudC51cmwsIHBvc3RVc2VyT3B0aW9ucyk7XHJcbiAgICBjb25zdCByZXNwb25zZVRleHQgPSBhd2FpdCByZXNwb25zZS50ZXh0KCk7XHJcbiAgICBjb25zdCBkYXRhID0gc29hcEJ1aWxkZXIuZ2V0UmVzcG9uc2VYbWwocmVzcG9uc2VUZXh0LCBzb2FwQWN0aW9uKTtcclxuICAgIHJldHVybiB7IGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpLCBzdGF0dXNDb2RlOiAyMDAgfTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coXCJzZW5kUmVxdWVzdDogXCIsIGVycm9yKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgbWVzc2FnZTogYEVycm9yIGVuIHNlbmRSZXF1ZXN0OiAke2Vycm9yfWAgfSksXHJcbiAgICAgIHN0YXR1c0NvZGU6IDUwMCxcclxuICAgIH07XHJcbiAgfVxyXG59XHJcbiJdfQ==