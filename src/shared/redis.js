import { createClient } from 'redis';

const redisClient = createClient();

const storeInSet = (setName, ip) => {
  redisClient.sadd(setName, ip);
};

export {
  redisClient,
  storeInSet
};
