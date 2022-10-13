import cacheRepository from '../repositories/CacheRepository.js';

class RedisCacheService {
   async save(key, value) {
      try {
         console.info(`Saving data in redis for key: ${key}`);
         await cacheRepository.save(key, JSON.stringify(value));
      } catch (error) {
         console.error(`Error on save data in redis for key ${key}`, error);
      }
   }

   async get(key) {
      try {
         let data = await cacheRepository.get(key);
         console.info(`Getting data in redis for key: ${key}`);
         return JSON.parse(data);
      } catch (error) {
         console.error(`Error on get data in redis for key ${key}`, error);
      }
      return null;
   }

   async existsForKey(key) {
      try {
         let data = await cacheRepository.exists(key);
         if (data) {
            console.info(`Exist cache in redis for key: ${key}`);
            return true;
         }
      } catch (error) {
         console.error(`Error when try check if exist data in redis for key ${key}`, error);
      }
      return false;
   }
}

export default new RedisCacheService();
