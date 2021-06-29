import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';
import middify from '@lib/src/middify';
import formatJSONResponse from '@lib/src/formatJsonResponse';
import performanceService from '@performance-history/src/database';

export const handler: Handler = middify(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const singerId: string = event.pathParameters!.singerId!;
  try {
    const history = await performanceService.getAllPerformances(singerId);

    return formatJSONResponse(200, history);
  } catch (err) {
    return formatJSONResponse(500, err);
  }
});
