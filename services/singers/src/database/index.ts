import createDynamoDBClient from '@lib/src/db';
import SingerService from '@singers/src/database/singerService';

const { SINGERS_TABLE } = process.env;

const singerService = new SingerService(createDynamoDBClient(), SINGERS_TABLE!);

export default singerService;
