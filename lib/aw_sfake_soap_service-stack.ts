import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import path = require("path");
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

export class AwSfakeSoapServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);


    const nodejsFunction = new NodejsFunction(this, "NodejsFunction", {
      runtime: lambda.Runtime.NODEJS_16_X,
      handler: "getRequest",
      entry: path.join(__dirname, "lambda", "handler.ts"),
    });

    //Api gw
    const api = new apigw.RestApi(this, "api");
    const mainResource = api.root.resourceForPath("fakeSoap");

    // Lambda con apigw
    mainResource.addMethod("POST", new apigw.LambdaIntegration(nodejsFunction));
    mainResource.addMethod("GET", new apigw.LambdaIntegration(nodejsFunction));
  }
}
