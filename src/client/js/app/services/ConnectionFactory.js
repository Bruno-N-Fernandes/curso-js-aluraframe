var ConnectionFactory = (function () {

    const dbName = "aluraframe";
    const version = 4;
    const stores = ["negociacao"];

    var connection = null;
    var close = null;

    return class ConnectionFactory {
        constructor (){
            throw Error("Classe estática");
        }

        static getConnection() {
            return new Promise((resolve, reject) => {
                let openRequest = window.indexedDB.open(dbName, version);
        
                openRequest.onupgradeneeded = e => ConnectionFactory.createObjectStore(e.target.result);
                openRequest.onsuccess = e => {
                    if (!connection) {
                        connection = e.target.result;
                        close = connection.close.bind(connection);
                        connection.close = () => { throw Error("Não pode fechar diretamente"); }
                        
                    }
                    resolve(connection);
                }
                openRequest.onerror = e => reject(e.target.error);    
            });
        }
        
        static createObjectStore(connection) {
            stores.forEach(store => {
                if (connection.objectStoreNames.contains(store)) {
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true});
            });
        }

        static closeConnection() {

            if(connection) {
                close();
                connection = null;
            }
        }
    }
})();