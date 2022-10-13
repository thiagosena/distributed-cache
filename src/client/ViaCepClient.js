import axios from 'axios';
import { VIA_CEP_URI } from '../config/config.js';


class ViaCepClient {
   async findByCep(cep) {
      let response = {};
      console.info(`Getting data from ViaCep API for CEP ${cep}`);

      await axios
         .get(VIA_CEP_URI(cep))
         .then(res => {
            let apiResponse = res.data;
            response = {
               cep: apiResponse.cep,
               logradouro: apiResponse.logradouro,
               complemento: apiResponse.complemento,
               bairro: apiResponse.bairro,
               localidade: apiResponse.localidade,
               uf: apiResponse.uf
            };
            console.info(`ViaCep API data for CEP ${cep}: ${JSON.stringify(apiResponse)}`);

         })
         .catch(err => {
            console.error(`Error when call ViaCep API from CEP ${cep}`, err);
         });
      return response;
   }
}

export default new ViaCepClient();
