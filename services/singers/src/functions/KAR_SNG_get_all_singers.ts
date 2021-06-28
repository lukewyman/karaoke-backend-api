import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import middify from '@lib/src/middify';
import formatJSONResponse from '@lib/src/formatJsonResponse';
import singerService from '@singers/src/database';

export const handler: Handler = middify(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const singers = await singerService.getAllSingers();

    return formatJSONResponse(200, singers);
  } catch (err) {
    return formatJSONResponse(500, `An error occurred: ${err}`);
  }
});
