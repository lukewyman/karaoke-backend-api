import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const parsedBody = JSON.parse(event.body || '');
    return {
      statusCode: 200,
      body: `Hello, ${parsedBody?.name}! Let's experiment with the serverless-webpack plugin!`,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `An error occurred: ${err}`,
    };
  }
};
