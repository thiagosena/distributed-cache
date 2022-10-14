import dotenv from 'dotenv';

dotenv.config();

export const APP_PORT = process.env.PORT ?? 8080;
export const VIA_CEP_URI = cep => {
   return `https://viacep.com.br/ws/${cep}/json`;
};

export const TTL = process.env.REDIS_TTL ?? 60;
export const CACHE_SCHEDULER = process.env.CACHE_SCHEDULER ?? '0 * * * * *';
export const REDIS_ENABLED = process.env.REDIS_ENABLED === 'true' ?? false;
export const REDIS_URL = process.env.REDIS_URL ?? 'redis://localhost:6379';
