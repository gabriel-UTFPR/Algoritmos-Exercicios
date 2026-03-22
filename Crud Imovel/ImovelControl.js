let listaImovel= [];
let oQueEstaFazendo = '';
let imovel= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaImovel.length; i++) {
   const imovel = listaImovel[i];

   if (imovel.nummatricula== chave) {

imovel.posicaoNaLista = i;

   return listaImovel[i];
  }
  }
  return null;
  }

function procure() {
  const nummatricula = document.getElementById("inputnummatricula").value;

  if (isNaN(nummatricula) || !Number.isInteger(Number(nummatricula)) || nummatricula<=0) {

  mostrarAviso("Precisa ser um número inteiro e positivo");
  document.getElementById("inputnummatricula").focus();
  return;
  }

  if(nummatricula) {
imovel = procurePorChavePrimaria(nummatricula)

  if (imovel) {
    mostrarDadosImovel(imovel)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputnummatricula").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputnummatricula").focus();

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
  let nummatricula;
  if (imovel == null){
nummatricula =  parseInt(document.getElementById("inputnummatricula").value);
  } else {
nummatricula = imovel.nummatricula;
  }

const endereço= document.getElementById("inputendereço").value;
const bairro= document.getElementById("inputbairro").value;
const tipo= document.getElementById("inputtipo").value;
const area= parseFloat(document.getElementById("inputarea").value);
const comodos= parseInt(document.getElementById("inputcomodos").value);
const alugado= document.getElementById("inputalugado").Checked;
let alugadotrad= alugado? "Não":"Sim";
const dataconclusao= document.getElementById("inputdataconclusao").value;
  if(nummatricula>0 && endereço && bairro && tipo && area && comodos>1 && dataconclusao) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
imovel = new Imovel(nummatricula,endereço,bairro,tipo,area,comodos,alugado,dataconclusao);
listaImovel.push(imovel);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
let imovelAlterado = new Imovel(nummatricula,endereço,bairro,tipo,area,comodos,alugado,dataconclusao);
listaImovel[imovel.posicaoNaLista] = imovelAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaImovel.length; i++) {

   if(imovel.posicaoNaLista != i) {
   novaLista.push(listaImovel[i]);
}
}
listaImovel = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputnummatricula").focus();
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
linha.nummatricula+" - "+
linha.endereço+" - "+
linha.bairro+" - "+
linha.tipo+" - "+
linha.area+" - "+
linha.comodos+" - "+
(linha.alugado? "Não":"Sim" )+" - "+
linha.dataconclusao+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaImovel);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosImovel(imovel){
document.getElementById("inputnummatricula").value = imovel.nummatricula;
document.getElementById("inputendereço").value = imovel.endereço;
document.getElementById("inputbairro").value = imovel.bairro;
document.getElementById("inputtipo").value = imovel.tipo;
document.getElementById("inputarea").value = imovel.area;
document.getElementById("inputcomodos").value = imovel.comodos;
document.getElementById("inputalugado").value = imovel.alugado;
document.getElementById("inputdataconclusao").value = imovel.dataconclusao;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputendereço").value = "";
document.getElementById("inputbairro").value = "";
document.getElementById("inputtipo").value = "";
document.getElementById("inputarea").value = "";
document.getElementById("inputcomodos").value = "";
document.getElementById("inputalugado").value = false;
document.getElementById("inputdataconclusao").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputnummatricula").readOnly = !soLeitura;
document.getElementById("inputendereço").readOnly = soLeitura;
document.getElementById("inputbairro").readOnly = soLeitura;
document.getElementById("inputtipo").readOnly = soLeitura;
document.getElementById("inputarea").readOnly = soLeitura;
document.getElementById("inputcomodos").readOnly = soLeitura;
document.getElementById("inputalugado").readOnly = soLeitura;
document.getElementById("inputdataconclusao").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputnummatricula").focus();
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
  let nomeDoArquivoDestino = "./Imovel.csv";
let textoCSV = "";
for (let i = 0; i < listaImovel.length; i++) {
const linha = listaImovel[i];
textoCSV += linha.nummatricula+";"+
linha.endereço+";"+
linha.bairro+";"+
linha.tipo+";"+
linha.area+";"+
linha.comodos+";"+
linha.alugado+";"+
linha.dataconclusao+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaImovel =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===8) {
listaImovel.push({
nummatricula: dados[0],
endereço: dados[1],
bairro: dados[2],
tipo: dados[3],
area: dados[4],
comodos: dados[5],
alugado: dados[6],
dataconclusao: dados[7]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}