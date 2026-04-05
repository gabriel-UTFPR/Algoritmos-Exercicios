class Celular {
    constructor(numeroMac, modelo, fabricante,preço, posicaoNaLista) {
        this.numeroMac = numeroMac;
        this.modelo = modelo;
        this.fabricante=fabricante;
        this.preço=preço;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}