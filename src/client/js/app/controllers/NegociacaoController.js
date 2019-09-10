class NegociacaoController {

    constructor() {
        let $ = document.querySelector.bind(document);
        this._inputData = $("#data");
        this._inputQuantidade = $("#quantidade");
        this._inputValor = $("#valor");

        this._listaNegociacao = new Bind(new ListaNegociacao(),
            new NegociacaoView($('#negociacaoView')),
            "adicionar", "removerTodos"
        );

        this._mensagem = new Bind(new Mensagem(),
            new MensagemView($('#mensagemView')),
            "texto"
        );
    }

    importar(event) {

        new NegociacaoService()
            .obterNegociacoes()
            .then(ln => ln.forEach(negociacao => this._listaNegociacao.adicionar(negociacao)))
            .catch(erro => this._mensagem.texto = erro);
    }

    adicionar(event) {
        event.preventDefault();
        this._listaNegociacao.adicionar(this._criarNegociacao());
        this._mensagem.texto = 'Negociação adicionada com sucesso';
        this._limparFormulario();
    }

    removerTodos(event) {
        this._listaNegociacao.removerTodos();
        this._mensagem.texto = "Negociações removidas com sucesso";
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