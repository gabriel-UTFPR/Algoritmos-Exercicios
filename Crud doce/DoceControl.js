let listaDoce= [];
let oQueEstaFazendo = '';
let doce= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaDoce.length; i++) {
   const doce = listaDoce[i];

   if (doce.codigo== chave) {

doce.posicaoNaLista = i;

   return listaDoce[i];
  }
  }
  return null;
  }

function procure() {
  const codigo = document.getElementById("inputcodigo").value;

  if (isNaN(codigo) || !Number.isInteger(Number(codigo))) {

  mostrarAviso("Precisa ser um número inteiro");
  document.getElementById("inputcodigo").focus();
  return;
  }

  if(codigo) {
doce = procurePorChavePrimaria(codigo)

  if (doce) {
    mostrarDadosDoce(doce)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputcodigo").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputcodigo").focus();

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
  let codigo;
  if (doce == null){
codigo =  parseInt(document.getElementById("inputcodigo").value);
  } else {
codigo = doce.codigo;
  }

const marca= document.getElementById("inputmarca").value;
const feitodeq= document.getElementById("inputfeitodeq").value;
const preço= parseFloat(document.getElementById("inputpreço").value);
const estoque= parseInt(document.getElementById("inputestoque").value);
  if(codigo && marca && feitodeq && preço>0 && estoque>0) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
doce = new Doce(codigo,marca,feitodeq,preço,estoque);
listaDoce.push(doce);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
doceAlterado = new Doce(codigo,marca,feitodeq,preço,estoque);
listaDoce[doce.posicaoNaLista] = doceAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaDoce.length; i++) {

   if(doce.posicaoNaLista != i) {
   novaLista.push(listaDoce[i]);
}
}
listaDoce = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputcodigo").focus();
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
linha.codigo+" - "+
linha.marca+" - "+
linha.feitodeq+" - "+
linha.preço+" - "+
linha.estoque+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaDoce);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosDoce(doce){
document.getElementById("inputcodigo").value = doce.codigo;
document.getElementById("inputmarca").value = doce.marca;
document.getElementById("inputfeitodeq").value = doce.feitodeq;
document.getElementById("inputpreço").value = doce.preço;
document.getElementById("inputestoque").value = doce.estoque;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputmarca").value = "";
document.getElementById("inputfeitodeq").value = "";
document.getElementById("inputpreço").value = "";
document.getElementById("inputestoque").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputcodigo").readOnly = !soLeitura;
document.getElementById("inputmarca").readOnly = soLeitura;
document.getElementById("inputfeitodeq").readOnly = soLeitura;
document.getElementById("inputpreço").readOnly = soLeitura;
document.getElementById("inputestoque").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputcodigo").focus();
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
  let nomeDoArquivoDestino = "./Doce.csv";
let textoCSV = "";
for (let i = 0; i < listaDoce.length; i++) {
const linha = listaDoce[i];
textoCSV += linha.codigo+";"+
linha.marca+";"+
linha.feitodeq+";"+
linha.preço+";"+
linha.estoque+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaDoce =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaDoce.push({
codigo: dados[0],
marca: dados[1],
feitodeq: dados[2],
preço: dados[3],
estoque: dados[4]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}