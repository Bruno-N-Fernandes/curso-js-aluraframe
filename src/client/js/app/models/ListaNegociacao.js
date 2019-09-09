class ListaNegociacao {

    constructor(armadilha) {
        this._listaNegociacao = [];
        this._armadilha = armadilha;
    }
    
    adicionar(negociacao){
        this._listaNegociacao.push(negociacao);
        this._armadilha(this);
    }

    removerTodos(){
        this._listaNegociacao = [];
        this._armadilha(this);
    }

    get listaNegociacao() {
        return [].concat(this._listaNegociacao);
    }

    get total(){
        return this._listaNegociacao.reduce((total, n) => total + n.volume, 0.0);
    }
}