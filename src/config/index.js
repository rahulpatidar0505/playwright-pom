import envQa from './env.qa.js';
import envProd from './env.prod.js';

const ENV = process.env.ENV || 'qa';

const configs = {
  qa: envQa,
  prod: envProd,
};

export default configs[ENV];
