class ListaNegociacao {

    constructor() {
        this._listaNegociacao = [];
    }
    
    adicionar(negociacao){
        this._listaNegociacao.push(negociacao);
    }

    removerTodos(){
        this._listaNegociacao = [];
    }

    get listaNegociacao() {
        return [].concat(this._listaNegociacao);
    }

    get total(){
        return this._listaNegociacao.reduce((total, n) => total + n.volume, 0.0);
    }

    existe(negociacao) {
        let negociacaoSerializado = JSON.stringify(negociacao);
        return this._listaNegociacao.some(n => JSON.stringify(n) == negociacaoSerializado)
    }

    ordenar(criterio) {
        this._listaNegociacao.sort(criterio);        
    }
    
    inverterOrdem() {
        this._listaNegociacao.reverse();
    }
}