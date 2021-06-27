import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import middify from '@lib/src/middify';
import formatJSONResponse from '@lib/src/formatJsonResponse';
import UpdateSinger from '../dtos/updateSingerDto';

export const handler: Handler = middify(
  async (event: APIGatewayProxyEvent & UpdateSinger): Promise<APIGatewayProxyResult> => {
    try {
      const method = event.httpMethod;
      return formatJSONResponse(200, `Soon this function will be able to ${method} a singer!`);
    } catch (err) {
      return formatJSONResponse(500, `An error occurred: ${err}`);
    }
  }
);
