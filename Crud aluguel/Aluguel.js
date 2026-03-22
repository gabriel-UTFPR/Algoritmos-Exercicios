class Aluguel {
  constructor(
    numeroContrato,
    nomeProprietario,
    nomeInquilino,
    valorAluguel,
    prazoDoContratoEmMeses,
    tradAlugado,
    dataDeInicioDoContrato,
    cepImovel,
    enderecoImovel,
    bairro,
    cidade
  ) {
    this.numeroContrato = numeroContrato;
    this.nomeProprietario = nomeProprietario;
    this.nomeInquilino = nomeInquilino;
    this.valorAluguel = valorAluguel;
    this.prazoDoContratoEmMeses = prazoDoContratoEmMeses;
    this.tradAlugado = tradAlugado;
    this.dataDeInicioDoContrato = dataDeInicioDoContrato;
    this.cepImovel = cepImovel;
    this.enderecoImovel = enderecoImovel;
    this.bairro = bairro;
    this.cidade = cidade;
    this.posicaoNaLista = null;
  }
}
