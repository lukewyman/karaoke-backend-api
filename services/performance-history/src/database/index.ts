import createDynamoDBClient from '@lib/src/db';
import PerformanceService from '@performance-history/src/database/performanceService';

const { PERFORMANCES_TABLE } = process.env;

const performanceService = new PerformanceService(createDynamoDBClient(), PERFORMANCES_TABLE!);

export default performanceService;
