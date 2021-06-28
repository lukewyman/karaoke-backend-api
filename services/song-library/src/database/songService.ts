import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Song from '@song-library/src/domain/Song';

class SongService {
  constructor(private readonly docClient: DocumentClient, private readonly tableName: string) {}

  async createSong(song: Song): Promise<Song> {
    await this.docClient
      .put({
        TableName: this.tableName,
        Item: song,
      })
      .promise();

    return song;
  }

  async getSong(songId: string): Promise<Song> {
    const result = await this.docClient
      .get({
        TableName: this.tableName,
        Key: { songId },
      })
      .promise();

    return result.Item as Song;
  }

  async getAllSongs(): Promise<Song[]> {
    const result = await this.docClient
      .scan({
        TableName: this.tableName,
      })
      .promise();

    return result.Items as Song[];
  }

  async updateSong(songId: string, partialSong: Partial<Song>): Promise<Song> {
    const updated = await this.docClient
      .update({
        TableName: this.tableName,
        Key: { songId },
        UpdateExpression: 'set #title = :title, artist = :artist, playDuration = :playDuration',
        ExpressionAttributeNames: {
          '#title': 'title',
        },
        ExpressionAttributeValues: {
          ':title': partialSong.title,
          ':artist': partialSong.artist,
          ':playDuration': partialSong.playDuration,
        },
        ReturnValues: 'ALL_NEW',
      })
      .promise();

    return updated.Attributes as Song;
  }

  async deleteSong(songId: string): Promise<DocumentClient.DeleteItemOutput> {
    return this.docClient
      .delete({
        TableName: this.tableName,
        Key: { songId },
      })
      .promise();
  }
}

export default SongService;
