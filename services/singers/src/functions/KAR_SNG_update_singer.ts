import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import middify from '@lib/src/middify';
import formatJSONResponse from '@lib/src/formatJsonResponse';
import UpdateSinger from '@singers/src/dtos/updateSingerDto';
import singerService from '@singers/src/database';

export const handler: Handler = middify(
  async (event: APIGatewayProxyEvent & UpdateSinger): Promise<APIGatewayProxyResult> => {
    const singerId = event.pathParameters!.singerId!;
    const { body } = event;
    try {
      const singer = await singerService.updateSinger(singerId, body);

      return formatJSONResponse(200, singer);
    } catch (err) {
      return formatJSONResponse(500, `An error occurred: ${err}`);
    }
  }
);
