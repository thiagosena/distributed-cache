import CepService from '../services/CepService.js';

class CepController {
   async findByCep(req, res) {
      return res.json(await CepService.findByCep(req));
   }
}

export default new CepController();
