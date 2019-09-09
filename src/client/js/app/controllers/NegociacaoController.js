class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);

        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");
        this._negociacaoView = new NegociacaoView($('#negociacaoView'));
        this._listaNegociacao = new ListaNegociacao(model => this._negociacaoView.update(model));
        this._negociacaoView.update(this._listaNegociacao);
        this._mensagem = new Mensagem();
        this._mensagemView = new MensagemView($('#mensagemView'));
        this._mensagemView.update(this._mensagem);
    }

    adicionar(event) {
        event.preventDefault();
        this._listaNegociacao.adicionar(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._mensagemView.update(this._mensagem);

        this._limparFormulario();
    }

    removerTodos() {
        this._listaNegociacao.removerTodos();
        this._mensagem = "Negociações removidas com sucesso";
        this._mensagemView.update(this._mensagem);
    }

    _criarNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            this._inputQuantidade.value,
            this._inputValor.value
        );
    }

    _limparFormulario(){
        this._inputData.value = '1982-11-30';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 1;
        this._inputData.focus();
    }
}