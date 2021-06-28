import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import middify from '@lib/src/middify';
import formatJSONResponse from '@lib/src/formatJsonResponse';
import songService from '@song-library/src/database';

export const handler: Handler = middify(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const songs = await songService.getAllSongs();

    return formatJSONResponse(200, songs);
  } catch (err) {
    return formatJSONResponse(500, err);
  }
});
