import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Singer from '@singers/src/domain/Singer';

class SingerService {
  constructor(private readonly docClient: DocumentClient, private readonly tableName: string) {}

  async createSinger(singer: Singer): Promise<Singer> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: singer,
      })
      .promise();

    return singer;
  }

  async getSinger(singerId: string): Promise<Singer> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { singerId },
      })
      .promise();

    return result.Item as Singer;
  }

  async getAllSingers(): Promise<Singer[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Singer[];
  }

  async updateSinger(singerId: string, partialSinger: Partial<Singer>): Promise<Singer> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { singerId },
        UpdateExpression: 'set #stageName = :stageName, firstName = :firstName, lastName = :lastName, email = :email',
        ExpressionAttributeNames: {
          '#stageName': 'stageName',
        },
        ExpressionAttributeValues: {
          ':stageName': partialSinger.stageName,
          ':firstName': partialSinger.firstName,
          ':lastName': partialSinger.lastName,
          ':email': partialSinger.email,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return updated.Attributes as Singer;
  }

  async deleteSinger(singerId: string): Promise<DocumentClient.DeleteItemOutput> {
    return this.docClient
      .delete({
        TableName: this.tableName,
        Key: { singerId },
      })
      .promise();
  }
}

export default SingerService;
