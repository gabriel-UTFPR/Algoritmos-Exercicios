let listaAluguel = [];
let oQueEstaFazendo = "";
let aluguel = null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
  for (let i = 0; i < listaAluguel.length; i++) {
    const aluguel = listaAluguel[i];

    if (aluguel.numeroContrato == chave) {
      aluguel.posicaoNaLista = i;

      return listaAluguel[i];
    }
  }
  return null;
}

function procure() {
  const numeroContrato = document.getElementById("inputnumeroContrato").value;

  if (
    isNaN(numeroContrato) ||
    !Number.isInteger(Number(numeroContrato)) ||
    numeroContrato < 0
  ) {
    mostrarAviso("Precisa ser um número inteiro e positivo");
    document.getElementById("inputnumeroContrato").focus();
    return;
  }

  if (numeroContrato) {
    aluguel = procurePorChavePrimaria(numeroContrato);

    if (aluguel) {
      mostrarDadosAluguel(aluguel);
      visibilidadeDosBotoes("inline", "none", "inline", "inline", "none");
      mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
      limparAtributos();
      visibilidadeDosBotoes("inline", "inline", "none", "none", "none");
      mostrarAviso("Não achou na lista, pode inserir");
    }
  } else {
    document.getElementById("inputnumeroContrato").focus();
    return;
  }
}

function inserir() {
  bloquearAtributos(false);
  visibilidadeDosBotoes("none", "none", "none", "none", "inline");
  oQueEstaFazendo = "inserindo";
  mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
  document.getElementById("inputnumeroContrato").focus();
}

function alterar() {
  bloquearAtributos(false);

  visibilidadeDosBotoes("none", "none", "none", "none", "inline");
  oQueEstaFazendo = "alterando";
  mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

function excluir() {
  bloquearAtributos(false);

  visibilidadeDosBotoes("none", "none", "none", "none", "inline");

  oQueEstaFazendo = "excluindo";
  mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
  let numeroContrato;
  if (aluguel == null) {
    numeroContrato = parseInt(
      document.getElementById("inputnumeroContrato").value
    );
  } else {
    numeroContrato = aluguel.numeroContrato;
  }

  const nomeProprietario = document.getElementById(
    "inputnomeProprietario"
  ).value;
  if (nomeProprietario == "") {
    alert("O nome do Proprietario NÃO pode estar vazio");
    document.getElementById("inputnomeProprietario").focus();
    return;
  }

  const nomeInquilino = document.getElementById("inputnomeInquilino").value;
  if (nomeInquilino == "") {
    alert("O nome do Inquilino NÃO pode estar vazio");
    document.getElementById("inputnomeInquilino").focus();
    return;
  }

  const valorAluguel = parseFloat(
    document.getElementById("inputvalorAluguel").value
  );
  if (valorAluguel < 0) {
    alert("O valor do aluguel NÃO pode ser menor que 0");
    document.getElementById("inputvalorAluguel").focus();
    return;
  }

  const prazoDoContratoEmMeses = parseInt(
    document.getElementById("inputprazoDoContratoEmMeses").value
  );
  if (prazoDoContratoEmMeses < 0 || prazoDoContratoEmMeses > 48) {
    alert("O contrato NÃO pode ser menor que 0 ou maior que 48");
    document.getElementById("inputprazoDoContratoEmMeses").focus();
    return;
  }

  const estaAlugado = document.getElementById("inputestaAlugado").checked;
  let tradAlugado = estaAlugado ? "Sim" : "Não";
  const dataDeInicioDoContrato = document.getElementById(
    "inputdataDeInicioDoContrato"
  ).value;
  const cepImovel = document.getElementById("inputcepImovel").value;

  const enderecoImovel = document.getElementById("inputenderecoImovel").value;

  const bairro = document.getElementById("inputbairro").value;

  const cidade = document.getElementById("inputcidade").value;
  if (
    numeroContrato &&
    nomeProprietario &&
    nomeInquilino &&
    valorAluguel &&
    prazoDoContratoEmMeses &&
    tradAlugado &&
    dataDeInicioDoContrato &&
    cepImovel &&
    enderecoImovel &&
    bairro &&
    cidade
  ) {
    switch (oQueEstaFazendo) {
      case "inserindo":
        aluguel = new Aluguel(
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
        );
        listaAluguel.push(aluguel);
        mostrarAviso("Inserido na lista");
        break;
      case "alterando":
        let aluguelAlterado = new Aluguel(
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
        );
        listaAluguel[aluguel.posicaoNaLista] = aluguelAlterado;
        mostrarAviso("Alterado");
        break;
      case "excluindo":
        let novaLista = [];

        for (let i = 0; i < listaAluguel.length; i++) {
          if (aluguel.posicaoNaLista != i) {
            novaLista.push(listaAluguel[i]);
          }
        }
        listaAluguel = novaLista;
        mostrarAviso("EXCLUIDO");
        break;
      default:
        mostrarAviso("Erro aleatório");
    }
    visibilidadeDosBotoes("inline", "none", "none", "none", "none");
    limparAtributos();
    listar();
    document.getElementById("inputnumeroContrato").focus();
  } else {
    alert("Erro nos dados digitados");
    return;
  }
}
function preparaListagem(vetor) {
  let texto = "";
  for (let i = 0; i < vetor.length; i++) {
    const linha = vetor[i];
    texto +=
      linha.numeroContrato +
      " - " +
      linha.nomeProprietario +
      " - " +
      linha.nomeInquilino +
      " - " +
      linha.valorAluguel +
      " - " +
      linha.prazoDoContratoEmMeses +
      " - " +
      linha.tradAlugado +
      " - " +
      linha.dataDeInicioDoContrato +
      " - " +
      linha.cepImovel +
      " - " +
      linha.enderecoImovel +
      " - " +
      linha.bairro +
      " - " +
      linha.cidade +
      " <br> ";
  }
  return texto;
}

function listar() {
  document.getElementById("outputSaida").innerHTML =
    preparaListagem(listaAluguel);
}
function cancelarOperacao() {
  limparAtributos();
  bloquearAtributos(true);
  visibilidadeDosBotoes("inline", "none", "none", "none", "none");
  mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
  document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosAluguel(aluguel) {
  document.getElementById("inputnumeroContrato").value = aluguel.numeroContrato;
  document.getElementById("inputnomeProprietario").value =
    aluguel.nomeProprietario;
  document.getElementById("inputnomeInquilino").value = aluguel.nomeInquilino;
  document.getElementById("inputvalorAluguel").value = aluguel.valorAluguel;
  document.getElementById("inputprazoDoContratoEmMeses").value =
    aluguel.prazoDoContratoEmMeses;
  document.getElementById("inputestaAlugado").value = aluguel.estaAlugado;
  document.getElementById("inputdataDeInicioDoContrato").value =
    aluguel.dataDeInicioDoContrato;
  document.getElementById("inputcepImovel").value = aluguel.cepImovel;
  document.getElementById("inputenderecoImovel").value = aluguel.enderecoImovel;
  document.getElementById("inputbairro").value = aluguel.bairro;
  document.getElementById("inputcidade").value = aluguel.cidade;
  bloquearAtributos(true);
}
function limparAtributos() {
  document.getElementById("inputnomeProprietario").value = "";
  document.getElementById("inputnomeInquilino").value = "";
  document.getElementById("inputvalorAluguel").value = "";
  document.getElementById("inputprazoDoContratoEmMeses").value = "";
  document.getElementById("inputestaAlugado").checked = false;
  document.getElementById("inputdataDeInicioDoContrato").value = "";
  document.getElementById("inputcepImovel").value = "";
  document.getElementById("inputenderecoImovel").value = "";
  document.getElementById("inputbairro").value = "";
  document.getElementById("inputcidade").value = "";
  bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
  document.getElementById("inputnumeroContrato").readOnly = !soLeitura;
  document.getElementById("inputnomeProprietario").readOnly = soLeitura;
  document.getElementById("inputnomeInquilino").readOnly = soLeitura;
  document.getElementById("inputvalorAluguel").readOnly = soLeitura;
  document.getElementById("inputprazoDoContratoEmMeses").readOnly = soLeitura;
  document.getElementById("inputestaAlugado").readOnly = soLeitura;
  document.getElementById("inputdataDeInicioDoContrato").readOnly = soLeitura;
  document.getElementById("inputcepImovel").readOnly = soLeitura;
  document.getElementById("inputenderecoImovel").readOnly = soLeitura;
  document.getElementById("inputbairro").readOnly = soLeitura;
  document.getElementById("inputcidade").readOnly = soLeitura;
}

function visibilidadeDosBotoes(
  btProcure,
  btInserir,
  btAlterar,
  btExcluir,
  btSalvar
) {
  document.getElementById("btProcure").style.display = btProcure;
  document.getElementById("btInserir").style.display = btInserir;
  document.getElementById("btAlterar").style.display = btAlterar;
  document.getElementById("btExcluir").style.display = btExcluir;
  document.getElementById("btSalvar").style.display = btSalvar;
  document.getElementById("btCancelar").style.display = btSalvar;
  document.getElementById("inputnumeroContrato").focus();
}

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
  const blob = new Blob([conteudo], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = arquivoDestino;
  link.click();
  URL.revokeObjectURL(link.href);
}

function abrirArquivoSalvoEmLocalPermanente() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".csv";
  input.onchange = function (event) {
    const arquivo = event.target.files[0];
    console.log(arquivo.name);
    if (arquivo) {
      converterDeCSVparaListaObjeto(arquivo);
    }
  };
  input.click();
}

function prepararESalvarCSV() {
  let nomeDoArquivoDestino = "./Aluguel.csv";
  let textoCSV = "";
  for (let i = 0; i < listaAluguel.length; i++) {
    const linha = listaAluguel[i];
    textoCSV +=
      linha.numeroContrato +
      ";" +
      linha.nomeProprietario +
      ";" +
      linha.nomeInquilino +
      ";" +
      linha.valorAluguel +
      ";" +
      linha.prazoDoContratoEmMeses +
      ";" +
      linha.tradAlugado +
      ";" +
      linha.dataDeInicioDoContrato +
      ";" +
      linha.cepImovel +
      ";" +
      linha.enderecoImovel +
      ";" +
      linha.bairro +
      ";" +
      linha.cidade +
      "\n";
  }
  persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
  const leitor = new FileReader();
  leitor.onload = function (e) {
    const conteudo = e.target.result;
    const linhas = conteudo.split("\n");
    listaAluguel = [];
    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i].trim();
      if (linha) {
        const dados = linha.split(";");
        if (dados.length === 11) {
          listaAluguel.push({
            numeroContrato: dados[0],
            nomeProprietario: dados[1],
            nomeInquilino: dados[2],
            valorAluguel: dados[3],
            prazoDoContratoEmMeses: dados[4],
            estaAlugado: dados[5],
            dataDeInicioDoContrato: dados[6],
            cepImovel: dados[7],
            enderecoImovel: dados[8],
            bairro: dados[9],
            cidade: dados[10],
          });
        }
      }
    }
    listar();
  };
  leitor.readAsText(arquivo);
}

function limpa_formulário_cep() {
  document.getElementById("inputbairro").value = "";
  document.getElementById("inputcidade").value = "";
}

function meu_callback(conteudo) {
  if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.getElementById("inputbairro").value = conteudo.bairro;
    document.getElementById("inputcidade").value = conteudo.localidade;
  } //end if.
  else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
  }
}

function pesquisacep(valor) {
  //Nova variável "cep" somente com dígitos.
  var cep = valor.replace(/\D/g, "");

  //Verifica se campo cep possui valor informado.
  if (cep != "") {
    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if (validacep.test(cep)) {
      //Preenche os campos com "..." enquanto consulta webservice.
      document.getElementById("inputbairro").value = "...";
      document.getElementById("inputcidade").value = "...";

      //Cria um elemento javascript.
      var script = document.createElement("script");

      //Sincroniza com o callback.
      script.src =
        "https://viacep.com.br/ws/" + cep + "/json/?callback=meu_callback";

      //Insere script no documento e carrega o conteúdo.
      document.body.appendChild(script);
    } //end if.
    else {
      //cep é inválido.
      limpa_formulário_cep();
      alert("Formato de CEP inválido.");
    }
  } //end if.
  else {
    //cep sem valor, limpa formulário. 
    limpa_formulário_cep();
  }
}

      function Datafinal() {
        debugger
        let vetorprazo=[];
        let prazo="";
        let inicio="";
        for (let i = 0; i < listaAluguel.length; i++) {
          linha=listaAluguel[i];
          inicio=linha.dataDeInicioDoContrato;
            alert(inicio)
prazo= inicio.setMonth(inicio.getMonth() + parseInt(linha.prazoDoContratoEmMeses))
          vetorprazo.push(prazo);

        
        }

      }      

