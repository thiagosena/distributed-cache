import express from 'express';
import cepRoutes from './src/routes/CepRoutes.js';
import * as scheduler from './src/services/CacheScheduler.js';
import { APP_PORT } from './src/config/config.js';

const app = express();
const PORT = APP_PORT;

scheduler.removeExpiredKeys();

app.use(cepRoutes);

app.get('/api/health', (req, res) => {
   return res.send({
      status: 'Up!'
   });
});

app.listen(PORT, () => {
   console.info(`Application started at port ${PORT} successfully`);
});
