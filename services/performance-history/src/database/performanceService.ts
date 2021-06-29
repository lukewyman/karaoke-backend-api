import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Performance from '@performance-history/src/domain/Performance';

class PerformanceService {
  constructor(private readonly docClient: DocumentClient, private readonly tableName: string) {}

  async createPerformance(performance: Performance): Promise<Performance> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: performance,
      })
      .promise();

    return performance;
  }

  async getAllPerformances(singerId: string): Promise<Performance[]> {
    const result = await this.docClient
      .query({
        TableName: this.tableName,
        KeyConditionExpression: '#singerId = :singerId',
        ExpressionAttributeNames: {
          '#singerId': 'singerId',
        },
        ExpressionAttributeValues: {
          ':singerId': singerId,
        },
      })
      .promise();

    return result.Items as Performance[];
  }
}

export default PerformanceService;
