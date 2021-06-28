import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import * as uuid from 'uuid';
import middify from '@lib/src/middify';
import formatJSONResponse from '@lib/src/formatJsonResponse';
import CreateSong from '@song-library/src/dtos/createSongDto';
import songService from '@song-library/src/database';

export const handler: Handler = middify(
  async (event: APIGatewayProxyEvent & CreateSong): Promise<APIGatewayProxyResult> => {
    const { title, artist, playDuration } = event.body;
    try {
      const songId: string = uuid.v4();
      const song = await songService.createSong({
        songId,
        title,
        artist,
        playDuration,
      });

      return formatJSONResponse(201, song);
    } catch (err) {
      return formatJSONResponse(500, err);
    }
  }
);
