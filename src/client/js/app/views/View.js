class View {

    constructor(elemento) {
        this._elemento = elemento;
    }

    template(model) { throw new Error("Método Abstrato");}

    update(model) {
        this._elemento.innerHTML = this.template(model);
    }
}