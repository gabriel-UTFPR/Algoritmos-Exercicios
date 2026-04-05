class Produtos {
    constructor(nome,quantidade,preço) {
        this.nome= nome;
        this.quantidade= quantidade;
        this.preço=preço;
        this.subtotal=preço*quantidade;
    }
}