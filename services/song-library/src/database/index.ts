import createDynamoDBClient from '@lib/src/db';
import SongService from '@song-library/src/database/songService';

const SONGS_TABLE = process.env.SONGS_TABLE!;

const songService = new SongService(createDynamoDBClient(), SONGS_TABLE);

export default songService;
