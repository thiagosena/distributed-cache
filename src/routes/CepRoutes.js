import { Router } from 'express';
import CepController from '../controllers/CepController.js';

const router = new Router();

router.get('/api/v1/cep/:cep', CepController.findByCep);

export default router;
