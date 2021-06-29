import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import middify from '@lib/src/middify';
import formatJSONResponse from '@lib/src/formatJsonResponse';
import AddPerformance from '@performance-history/src/dtos/addPerformanceDto';
import performanceService from '@performance-history/src/database';

export const handler: Handler = middify(
  async (event: APIGatewayProxyEvent & AddPerformance): Promise<APIGatewayProxyResult> => {
    const { singerId, songId, songTitle, artist } = event.body;
    try {
      const performanceDate = new Date().toISOString();
      const result = await performanceService.createPerformance({
        singerId,
        songId,
        songTitle,
        artist,
        performanceDate,
      });

      return formatJSONResponse(201, result);
    } catch (err) {
      return formatJSONResponse(500, `${err}`);
    }
  }
);
