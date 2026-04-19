let listaMateriais= [];
let oQueEstaFazendo = '';
let materiais= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaMateriais.length; i++) {
   const materiais = listaMateriais[i];

   if (materiais.id== chave) {

materiais.posicaoNaLista = i;

   return listaMateriais[i];
  }
  }
  return null;
  }

function procure() {
  const id = document.getElementById("inputid").value;

  if (isNaN(id) || !Number.isInteger(Number(id))) {

  mostrarAviso("Precisa ser um número inteiro");
  document.getElementById("inputid").focus();
  return;
  }

  if(id) {
materiais = procurePorChavePrimaria(id)

  if (materiais) {
    mostrarDadosMateriais(materiais)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputid").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputid").focus();

}

function alterar() {

   bloquearAtributos(false);

   visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
   oQueEstaFazendo = 'alterando';
   mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

function excluir() {
  bloquearAtributos(false);

  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

  oQueEstaFazendo = 'excluindo';
  mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
  let id;
  if (materiais == null){
id =  parseInt(document.getElementById("inputid").value);
  } else {
id = materiais.id;
  }

const nome= document.getElementById("inputnome").value;
const categoria= document.getElementById("inputcategoria").value;
const estoque= parseInt(document.getElementById("inputestoque").value);
const preço= parseFloat(document.getElementById("inputpreço").value).toFixed(2);
  if(id && nome && categoria && estoque && preço) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
materiais = new Materiais(id,nome,categoria,estoque,preço);
listaMateriais.push(materiais);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
let materiaisAlterado = new Materiais(id,nome,categoria,estoque,preço);
listaMateriais[materiais.posicaoNaLista] = materiaisAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaMateriais.length; i++) {

   if(materiais.posicaoNaLista != i) {
   novaLista.push(listaMateriais[i]);
}
}
listaMateriais = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputid").focus();
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
linha.id+" - "+
linha.nome+" - "+
linha.categoria+" - "+
linha.estoque+"un - R$ "+
linha.preço+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaMateriais);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosMateriais(materiais){
document.getElementById("inputid").value = materiais.id;
document.getElementById("inputnome").value = materiais.nome;
document.getElementById("inputcategoria").value = materiais.categoria;
document.getElementById("inputestoque").value = materiais.estoque;
document.getElementById("inputpreço").value = materiais.preço;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputnome").value = "";
document.getElementById("inputcategoria").value = "";
document.getElementById("inputestoque").value = "";
document.getElementById("inputpreço").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputid").readOnly = !soLeitura;
document.getElementById("inputnome").readOnly = soLeitura;
document.getElementById("inputcategoria").readOnly = soLeitura;
document.getElementById("inputestoque").readOnly = soLeitura;
document.getElementById("inputpreço").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputid").focus();
}

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
const blob = new Blob([conteudo], { type: 'text/plain' });
 const link = document.createElement('a');
 link.href = URL.createObjectURL(blob);
 link.download = arquivoDestino;
link.click(); 
 URL.revokeObjectURL(link.href);
}

function abrirArquivoSalvoEmLocalPermanente() {
const input = document.createElement('input');
 input.type = 'file';
 input.accept = '.csv';
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
  let nomeDoArquivoDestino = "./Materiais.csv";
let textoCSV = "";
for (let i = 0; i < listaMateriais.length; i++) {
const linha = listaMateriais[i];
textoCSV += linha.id+";"+
linha.nome+";"+
linha.categoria+";"+
linha.estoque+";"+
linha.preço+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaMateriais =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaMateriais.push({
id: dados[0],
nome: dados[1],
categoria: dados[2],
estoque: dados[3],
preço: dados[4]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}
  function Procurar() {
           vetorCategoria=[];
    // 1. Pega uma referência ao elemento <select> usando seu ID
            const selectElement = document.getElementById('inputpcategoria');

            // 2. O valor selecionado em um <select> é acessado via a propriedade 'value'
            const escolha = selectElement.value;

            // O texto da opção selecionada (mais amigável) é acessado via selectedOptions[0].text
            const textoEscolhido = selectElement.options[selectElement.selectedIndex].text;

            // 3. Exibe a escolha em um   span
            if (escolha !== "") {
                // Usamos o texto para uma mensagem mais amigável
               for (let i = 0; i < listaMateriais.length; i++) {
                let p=listaMateriais[i];
                if (escolha==p.categoria){
                vetorCategoria.push(p);
            }
        }
    }
    let listaCategoria="";
    if (vetorCategoria[0]==null) {
      listaCategoria="Nenhum material dessa categoria foi encontrado";
    }else{
       listaCategoria=preparaListagem(vetorCategoria);
    }
    document.getElementById('outputSaida2').innerHTML=listaCategoria;
  }
