class NegociacaoService {

    obterNegociacoesDaSemana(cb) {

        let xhr = new XMLHttpRequest();
        xhr.open("Get", " negociacoes/semana");

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    let listaNegociacao = JSON.parse(xhr.responseText)
                    .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor))
                    cb(null, listaNegociacao);
                } else {
                    cb("Erro ao obter Negociações", null);
                }
            }
        }

        xhr.send();
    }
}