import dotenv from 'dotenv-safe';
import add from '@src/math/add';

dotenv.config();

console.log(add(1, 2));
console.log(`Hi, ${process.env.MY_NAME}!`);
