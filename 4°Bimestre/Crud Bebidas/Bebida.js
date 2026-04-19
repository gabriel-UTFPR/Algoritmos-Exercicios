class Bebida {
    constructor(id, nome, fabricante,preçoEtiqueta,ehAlcolico, posicaoNaLista) {
        this.id = id;
        this.nome = nome;
        this.fabricante=fabricante;
        this.preçoEtiqueta=preçoEtiqueta;
        this.ehAlcolico=ehAlcolico;


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}