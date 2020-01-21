/* Código simplório, apenas para fornecer o serviço para a aplicação */

import { listaSemana, listaAnterior, listaRetrasada, cadastraNegociacao } from '../api';

export default function(app) {
    
    app.route('/negociacoes/semana')
        .get(listaSemana);
        
    app.route('/negociacoes/anterior')
        .get(listaAnterior);
        
    app.route('/negociacoes/retrasada')
        .get(listaRetrasada);  
        
    app.route('/negociacoes')
        .post(cadastraNegociacao);          
};