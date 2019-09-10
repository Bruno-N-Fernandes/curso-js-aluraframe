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

        this._service = new NegociacaoService();

        this._init();
    }

    _init() {
        this._service
            .obterTodos(this._listaNegociacao)
            .then(listaNegociacao => listaNegociacao.forEach(negociacao => this._listaNegociacao.adicionar(negociacao)))
            .then(this._mensagem.texto = "Negociações carregadas com sucesso")
            .catch(erro => this.Mensagem.texto = erro);

        setInterval(() => this.importar(event), 3000);
    }

    importar(event) {
        this._service
            .obterNegociacoes(this._listaNegociacao)
            .then(listaNegociacao => listaNegociacao.forEach(negociacao => this._listaNegociacao.adicionar(negociacao)))
            .then(this._mensagem.texto = "Negociações importadas com sucesso")
            .catch(erro => this._mensagem.texto = erro);
    }

    adicionar(event) {
        event.preventDefault();
        let negociacao = this._criarNegociacao();

        if (this._listaNegociacao.existe(negociacao)) return;

        this._service
            .incluir(negociacao)
            .then(this._listaNegociacao.adicionar(negociacao))
            .then(this._mensagem.texto = "Negociação adicionada com sucesso")
            .then(this._limparFormulario())
            .catch(erro => this._mensagem.texto = erro);
    }

    removerTodos(event) {
        this._service
            .removerTodos()
            .then(this._listaNegociacao.removerTodos())
            .then(this._mensagem.texto = "Negociações removidas com sucesso")
            .catch(erro => this._mensagem.texto = erro);
    }

    _criarNegociacao() {
        return new Negociacao(
            DateHelper.textoParaData(this._inputData.value),
            parseInt(this._inputQuantidade.value),
            parseFloat(this._inputValor.value)
        );
    }

    _limparFormulario(){
        this._inputData.value = '1982-11-30';
        this._inputQuantidade.value = 1;
        this._inputValor.value = 1;
        this._inputData.focus();
    }
}