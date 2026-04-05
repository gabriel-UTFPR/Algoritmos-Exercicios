class Notebook {
    constructor(id, modelo, datalançamento, fabricante,quantidadeRam, processador,fabricanteProcessador,armazenamentoPermanente,posicaoNaLista) {
        this.id = id;
        this.modelo = modelo;
        this.datalançamento=datalançamento;
        this.fabricante=fabricante;
        this.quantidadeRam=quantidadeRam;
        this.processador=processador
        this.fabricanteProcessador=fabricanteProcessador;
        this.armazenamentoPermanente=armazenamentoPermanente


        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}