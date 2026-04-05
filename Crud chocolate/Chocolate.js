class Chocolate {
    constructor(codigo, nome, fabricante,datalançamento, posicaoNaLista) {
        this.codigo = codigo;
        this.nome = nome;
        this.fabricante=fabricante;
        this.datalançamento=datalançamento;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}