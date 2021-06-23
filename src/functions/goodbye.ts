import { APIGatewayProxyEvent, Handler, APIGatewayProxyResult } from 'aws-lambda';

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const parsedBody = JSON.parse(event.body || '');
    return {
      statusCode: 200,
      body: `Goodbye, ${parsedBody?.name}! Hope you had fun!`,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `There was an error: ${err}`,
    };
  }
};
