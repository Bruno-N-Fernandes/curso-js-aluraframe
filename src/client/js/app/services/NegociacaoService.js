class NegociacaoService {

    constructor () {
        this._httpService = new HttpService();
    }


    obterNegociacoesDaSemana() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get("negociacoes/semana")
                .then(ln => resolve(ln.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject("Erro ao obter Negociações da semana"))
            ;
        });
    }

    obterNegociacoesDaSemanaAnterior() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get("negociacoes/anterior")
                .then(ln => resolve(ln.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject("Erro ao obter Negociações da semana anterior"))
            ;
        });
    }

    obterNegociacoesDaSemanaRetrasada() {
        return new Promise((resolve, reject) => {
            this._httpService
                .get("negociacoes/retrasada")
                .then(ln => resolve(ln.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))))
                .catch(erro => reject("Erro ao obter Negociações da semana retrasada"))
            ;
        });
    }

    obterNegociacoes(listaNegociacao) {
        
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])
                .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor ));

            return negociacoes;
        })
        .then(ln => ln.filter(negociacao => !listaNegociacao.existe(negociacao)))
        .catch(erro => {
            throw new Error(erro);
        });
    }
    
    incluir(negociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.adicionar(negociacao))
            .then(() => "Negociação adicionada com sucesso")
            .catch(erro => { throw new Error(erro); });
    }

    removerTodos() {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.removerTodos())
            .catch(erro => { throw new Error(erro); });
    }

    obterTodos(listaNegociacao) {
        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(negociacaoDao => negociacaoDao.obterTodos())
            .then(ln => ln.filter(negociacao => !listaNegociacao.existe(negociacao)))
            .catch(erro => { throw new Error(erro); });
    }
}