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
}