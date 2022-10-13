import { TTL } from '../config/config.js';

const CACHE = new Map();

class LocalCacheService {
   save(key, value) {
      try {
         if (!this.existsForKey(key)) {
            let data = {
               value,
               expire: this.getExpiration()
            };
            CACHE.set(key, data);
            console.info(`Cache saved for key ${key}`);
         }

      } catch (error) {
         console.error(`Error when try to save cache for key ${key}`, error);
      }
   }

   getExpiration() {
      let expire = new Date();
      expire.setSeconds(expire.getSeconds() + TTL);
      console.info(`Expiration data ${expire}`);
      return expire;
   }

   get(key) {
      try {
         if (this.existsForKey(key)) {
            console.info(`Exists cache for key ${key}`);
            return CACHE.get(key).value;
         }
         console.info(`Not exists cache for key ${key}`);
      } catch (error) {
         console.error(`Error when try to get cache for key ${key}`, error);
      }
      return null;
   }

   existsForKey(key) {
      let exists = CACHE.has(key);
      if (exists && this.isExpired(key)) {
         this.remove(key);
         return false;
      }
      return exists;
   }

   isExpired(key) {
      let expired = CACHE.get(key).expire;
      return new Date() > expired;
   }

   remove(key) {
      CACHE.delete(key);
   }

   removeExpiredKeys() {
      let expiredKeys = Array.from(CACHE.keys()).filter(key => {
         return this.isExpired(key);
      });

      expiredKeys.forEach(key => {
         this.remove(key);
      });
      console.info(`${expiredKeys.length} is removed`);
   }

}

export default new LocalCacheService();
