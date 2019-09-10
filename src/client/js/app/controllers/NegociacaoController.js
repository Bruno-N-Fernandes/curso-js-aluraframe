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

        this._carregar();
    }

    _carregar() {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.obterTodos())
            .then(listaNegociacao => listaNegociacao.filter(negociacao => !this._listaNegociacao.existe(negociacao)))
            .then(listaNegociacao => listaNegociacao.forEach(negociacao => this._listaNegociacao.adicionar(negociacao)))
            .then(this._mensagem.texto = "Negociações carregadas com sucesso")
            .catch(erro => this.Mensagem.texto = erro);
    }

    importar(event) {
        new NegociacaoService()
            .obterNegociacoes()
            .then(listaNegociacao => listaNegociacao.filter(negociacao => !this._listaNegociacao.existe(negociacao)))
            .then(listaNegociacao => listaNegociacao.forEach(negociacao => this._listaNegociacao.adicionar(negociacao)))
            .then(this._mensagem.texto = "Negociações importadas com sucesso")
            .catch(erro => this._mensagem.texto = erro);
    }

    adicionar(event) {
        event.preventDefault();
        let negociacao = this._criarNegociacao();

        if (this._listaNegociacao.existe(negociacao)) return;

        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.adicionar(negociacao))
            .then(this._listaNegociacao.adicionar(negociacao))
            .then(this._mensagem.texto = "Negociação adicionada com sucesso")
            .then(this._limparFormulario())
            .catch(erro => this._mensagem.texto = erro);
    }

    removerTodos(event) {
        ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.removerTodos())
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