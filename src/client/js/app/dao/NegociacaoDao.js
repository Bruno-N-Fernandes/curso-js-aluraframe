class NegociacaoDao {
    constructor(connection){
        this._connection = connection;
        this._store = "negociacao";
    }

    adicionar(negociacao) {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .add(negociacao);

            request.onsuccess = e => resolve();
            request.onerror = e => reject(e.target.error);
        });
    }

    obterTodos() {
        return new Promise((resolve, reject) => {
            let cursor = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .openCursor();

            let listaNegociacao = [];

            cursor.onsuccess = e => {
                let atual = e.target.result;
                if (atual){
                    var dado = atual.value;
                    listaNegociacao.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
                    atual.continue();
                } else {
                    resolve(listaNegociacao);
                }
            };

            cursor.onerror = e => reject(e.target.error);
        });
    }

    removerTodos() {
        return new Promise((resolve, reject) => {
            let request = this._connection
                .transaction([this._store], "readwrite")
                .objectStore(this._store)
                .clear();

            request.onsuccess = e => resolve("Negociacoes removidas com sucesso");
            request.onerror = e => reject(e.target.error);
        });
    }
}