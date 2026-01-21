const ENV = process.env.ENV || 'qa';

const configs = {
  qa: require('./env.qa'),
  stage: require('./env.stage'),
  prod: require('./env.prod'),
};

export default configs[ENV];
