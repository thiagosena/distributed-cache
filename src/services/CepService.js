import ViaCepClient from '../client/ViaCepClient.js';
import CacheServiceWrapper from './CacheServiceWrapper.js';

class CepService {
   async findByCep(req) {
      const { cep } = req.params;
      if (await CacheServiceWrapper.exists(cep)) {
         console.info(`Exists cache for key ${cep}`);
         return CacheServiceWrapper.get(cep);
      }
      let response = await ViaCepClient.findByCep(cep);
      await CacheServiceWrapper.save(cep, response);
      return response;
   }
}

export default new CepService();
