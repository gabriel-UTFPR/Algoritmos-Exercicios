let listaControleEquipamentos = [];
let oQueEstaFazendo = "";
let controleequipamentos = null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
  for (let i = 0; i < listaControleEquipamentos.length; i++) {
    const controleequipamentos = listaControleEquipamentos[i];

    if (controleequipamentos.patrimonio == chave) {
      controleequipamentos.posicaoNaLista = i;

      return listaControleEquipamentos[i];
    }
  }
  return null;
}

function procure() {
  const patrimonio = document.getElementById("inputpatrimonio").value;

  if (
    isNaN(patrimonio) ||
    !Number.isInteger(Number(patrimonio)) ||
    patrimonio < 99999
  ) {
    mostrarAviso("Precisa ser um número inteiro e ter 6 dígitos");
    document.getElementById("inputpatrimonio").focus();
    return;
  }

  if (patrimonio) {
    controleequipamentos = procurePorChavePrimaria(patrimonio);

    if (controleequipamentos) {
      mostrarDadosControleEquipamentos(controleequipamentos);
      visibilidadeDosBotoes("inline", "none", "inline", "inline", "none");
      mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
      limparAtributos();
      visibilidadeDosBotoes("inline", "inline", "none", "none", "none");
      mostrarAviso("Não achou na lista, pode inserir");
    }
  } else {
    document.getElementById("inputpatrimonio").focus();
    return;
  }
}

function inserir() {
  bloquearAtributos(false);
  visibilidadeDosBotoes("none", "none", "none", "none", "inline");
  oQueEstaFazendo = "inserindo";
  mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
  document.getElementById("inputpatrimonio").focus();
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
  let patrimonio;
  if (controleequipamentos == null) {
    patrimonio = parseInt(document.getElementById("inputpatrimonio").value);
  } else {
    patrimonio = controleequipamentos.patrimonio;
  }
  debugger;
  const descricao = document.getElementById("inputdescricao").value;
  const dataDeAquisicao = document.getElementById("inputdataDeAquisicao").value;
  const localizacao = document.getElementById("inputlocalizacao").value;
  const emManutencao = document.getElementById("inputemManutencao").checked;
  let Manutencao = emManutencao ? "sim" : "não";
  let dataformatada = formatarData(dataDeAquisicao);
  debugger
  const hoje = new Date().toISOString().split("T")[0];
  if (dataDeAquisicao > hoje) {
    alert("A data não pode ser futura à data atual!");
    return;
  }

  if (patrimonio && descricao && dataformatada && localizacao) {
    switch (oQueEstaFazendo) {
      case "inserindo":
        controleequipamentos = new ControleEquipamentos(
          patrimonio,
          descricao,
          dataformatada,
          localizacao,
          Manutencao
        );
        listaControleEquipamentos.push(controleequipamentos);
        mostrarAviso("Inserido na lista");
        break;
      case "alterando":
        let controleequipamentosAlterado = new ControleEquipamentos(
          patrimonio,
          descricao,
          dataformatada,
          localizacao,
          Manutencao
        );
        listaControleEquipamentos[controleequipamentos.posicaoNaLista] =
          controleequipamentosAlterado;
        mostrarAviso("Alterado");
        break;
      case "excluindo":
        let novaLista = [];

        for (let i = 0; i < listaControleEquipamentos.length; i++) {
          if (controleequipamentos.posicaoNaLista != i) {
            novaLista.push(listaControleEquipamentos[i]);
          }
        }
        listaControleEquipamentos = novaLista;
        mostrarAviso("EXCLUIDO");
        break;
      default:
        mostrarAviso("Erro aleatório");
    }
    visibilidadeDosBotoes("inline", "none", "none", "none", "none");
    limparAtributos();
    listar();
    document.getElementById("inputpatrimonio").focus();
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
      linha.patrimonio +
      " - " +
      linha.descricao +
      " - " +
      linha.dataformatada +
      " - " +
      linha.localizacao +
      " - " +
      linha.Manutencao +
      " <br> ";
  }
  return texto;
}

function listar() {
  document.getElementById("outputSaida").innerHTML = preparaListagem(
    listaControleEquipamentos
  );
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

function mostrarDadosControleEquipamentos(controleequipamentos) {
  document.getElementById("inputpatrimonio").value =
    controleequipamentos.patrimonio;
  document.getElementById("inputdescricao").value =
    controleequipamentos.descricao;
  document.getElementById("inputdataDeAquisicao").value =
    controleequipamentos.dataformatada;
  document.getElementById("inputlocalizacao").value =
    controleequipamentos.localizacao;
  document.getElementById("inputemManutencao").value =
    controleequipamentos.emManutencao;
  bloquearAtributos(true);
}
function limparAtributos() {
  document.getElementById("inputdescricao").value = "";
  document.getElementById("inputdataDeAquisicao").value = "";
  document.getElementById("inputlocalizacao").value = "";
  document.getElementById("inputemManutencao").value = false;
  bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
  document.getElementById("inputpatrimonio").readOnly = !soLeitura;
  document.getElementById("inputdescricao").readOnly = soLeitura;
  document.getElementById("inputdataDeAquisicao").readOnly = soLeitura;
  document.getElementById("inputlocalizacao").readOnly = soLeitura;
  document.getElementById("inputemManutencao").readOnly = soLeitura;
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
  document.getElementById("inputpatrimonio").focus();
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
  let nomeDoArquivoDestino = "./ControleEquipamentos.csv";
  let textoCSV = "";
  for (let i = 0; i < listaControleEquipamentos.length; i++) {
    const linha = listaControleEquipamentos[i];
    textoCSV +=
      linha.patrimonio +
      ";" +
      linha.descricao +
      ";" +
      linha.dataformatada +
      ";" +
      linha.localizacao +
      ";" +
      linha.Manutencao +
      "\n";
  }
  persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
  const leitor = new FileReader();
  leitor.onload = function (e) {
    const conteudo = e.target.result;
    const linhas = conteudo.split("\n");
    listaControleEquipamentos = [];
    for (let i = 0; i < linhas.length; i++) {
      const linha = linhas[i].trim();
      if (linha) {
        const dados = linha.split(";");
        if (dados.length === 5) {
          listaControleEquipamentos.push({
            patrimonio: dados[0],
            descricao: dados[1],
            dataformatada: dados[2],
            localizacao: dados[3],
            Manutencao: dados[4],
          });
        }
      }
    }
    listar();
  };
  leitor.readAsText(arquivo);
}
function formatarData(dataDeAquisicao) {
  // Exemplo de entrada: "2025-11-07"
  const partes = dataDeAquisicao.split("-"); // divide em ["2025", "11", "07"]
  const ano = partes[0];
  const mes = partes[1];
  const dia = partes[2];

  return `${dia}/${mes}/${ano}`;
}
// Data atual no formato YYYY-MM-DD
