import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import middify from '../lib/middify';
import formatJSONResponse from '../lib/formatJsonResponse';

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const method = event.httpMethod;
    return formatJSONResponse(200, `Soon this function will be able to ${method} a singer!`);
  } catch (err) {
    return formatJSONResponse(500, `An error occurred: ${err}`);
  }
};
