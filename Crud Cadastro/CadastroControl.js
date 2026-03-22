let listaCadastro= [];
let oQueEstaFazendo = '';
let cadastro= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaCadastro.length; i++) {
   const cadastro = listaCadastro[i];

   if (cadastro.codigo== chave) {

cadastro.posicaoNaLista = i;

   return listaCadastro[i];
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
cadastro = procurePorChavePrimaria(codigo)

  if (cadastro) {
    mostrarDadosCadastro(cadastro)
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
  if (cadastro == null){
codigo =  parseInt(document.getElementById("inputcodigo").value);
  } else {
codigo = cadastro.codigo;
  }

const nome= document.getElementById("inputnome").value;
const marca= document.getElementById("inputmarca").value;
const preço= parseFloat(document.getElementById("inputpreço").value).toFixed(2);
const estoque= parseInt(document.getElementById("inputestoque").value);
  if(codigo>0 && nome && marca && preço>0 && estoque>0) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
cadastro = new Cadastro(codigo,nome,marca,preço,estoque);
listaCadastro.push(cadastro);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
cadastroAlterado = new Cadastro(codigo,nome,marca,preço,estoque);
listaCadastro[cadastro.posicaoNaLista] = cadastroAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaCadastro.length; i++) {

   if(cadastro.posicaoNaLista != i) {
   novaLista.push(listaCadastro[i]);
}
}
listaCadastro = novaLista;
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
linha.nome+" - "+
linha.marca+" - R$ "+
linha.preço+" - "+
linha.estoque+"Un <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaCadastro);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosCadastro(cadastro){
document.getElementById("inputcodigo").value = cadastro.codigo;
document.getElementById("inputnome").value = cadastro.nome;
document.getElementById("inputmarca").value = cadastro.marca;
document.getElementById("inputpreço").value = cadastro.preço;
document.getElementById("inputestoque").value = cadastro.estoque;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputnome").value = "";
document.getElementById("inputmarca").value = "";
document.getElementById("inputpreço").value = "";
document.getElementById("inputestoque").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputcodigo").readOnly = !soLeitura;
document.getElementById("inputnome").readOnly = soLeitura;
document.getElementById("inputmarca").readOnly = soLeitura;
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
  let nomeDoArquivoDestino = "./Cadastro.csv";
let textoCSV = "";
for (let i = 0; i < listaCadastro.length; i++) {
const linha = listaCadastro[i];
textoCSV += linha.codigo+";"+
linha.nome+";"+
linha.marca+";"+
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
 listaCadastro =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaCadastro.push({
codigo: dados[0],
nome: dados[1],
marca: dados[2],
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