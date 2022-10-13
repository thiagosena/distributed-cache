import { createClient } from 'redis';
import { REDIS_URL, TTL } from '../config/config.js';

const redisRepository = createClient({
   url: REDIS_URL
});

redisRepository.on('error', (error) => {
   console.error('Redis client error', error);
});

await redisRepository.connect();

class CacheRepository {

   async save(key, value) {
      try {
         await redisRepository.set(key, value, {
            EX: TTL
         });
      } catch (error) {
         console.error(`Error on save data in redis for key ${key}`, error);
      }
   }

   async get(key) {
      try {
         return await redisRepository.get(key);
      } catch (error) {
         console.error(`Error on get data in redis for key ${key}`, error);
         return null;
      }
   }

   async exists(key) {
      try {
         return await redisRepository.exists(key);
      } catch (error) {
         console.error(`Error when check if exists key in redis for key ${key}`, error);
         return null;
      }
   }
}

export default new CacheRepository();
