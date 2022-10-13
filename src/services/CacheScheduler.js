import schedule from 'node-schedule';
import { CACHE_SCHEDULER, REDIS_ENABLED } from '../config/config.js';
import LocalCacheService from './LocalCacheService.js';

export function removeExpiredKeys() {
   if (!REDIS_ENABLED) {
      schedule.scheduleJob(CACHE_SCHEDULER, () => {
         LocalCacheService.removeExpiredKeys();
      });
   }
}
