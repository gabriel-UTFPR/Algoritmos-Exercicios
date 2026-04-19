let listaLivro= [];
let oQueEstaFazendo = '';
let livro= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaLivro.length; i++) {
   const livro = listaLivro[i];

   if (livro.codigo== chave) {

livro.posicaoNaLista = i;

   return listaLivro[i];
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
livro = procurePorChavePrimaria(codigo)

  if (livro) {
    mostrarDadosLivro(livro)
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
  if (livro == null){
codigo =  parseInt(document.getElementById("inputcodigo").value);
  } else {
codigo = livro.codigo;
  }

const titulo= document.getElementById("inputtitulo").value;
const autor= document.getElementById("inputautor").value;
const anopublicacao= document.getElementById("inputanopublicacao").value;
const genero= document.getElementById("inputgenero").value;
  if(codigo && titulo && autor && anopublicacao && genero) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
livro = new Livro(codigo,titulo,autor,anopublicacao,genero);
listaLivro.push(livro);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
livroAlterado = new Livro(codigo,titulo,autor,anopublicacao,genero);
listaLivro[livro.posicaoNaLista] = livroAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaLivro.length; i++) {

   if(livro.posicaoNaLista != i) {
   novaLista.push(listaLivro[i]);
}
}
listaLivro = novaLista;
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
linha.titulo+" - "+
linha.autor+" - "+
linha.anopublicacao+" - "+
linha.genero+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaLivro);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosLivro(livro){
document.getElementById("inputcodigo").value = livro.codigo;
document.getElementById("inputtitulo").value = livro.titulo;
document.getElementById("inputautor").value = livro.autor;
document.getElementById("inputanopublicacao").value = livro.anopublicacao;
document.getElementById("inputgenero").value = livro.genero;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputtitulo").value = "";
document.getElementById("inputautor").value = "";
document.getElementById("inputanopublicacao").value = "";
document.getElementById("inputgenero").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputcodigo").readOnly = !soLeitura;
document.getElementById("inputtitulo").readOnly = soLeitura;
document.getElementById("inputautor").readOnly = soLeitura;
document.getElementById("inputanopublicacao").readOnly = soLeitura;
document.getElementById("inputgenero").readOnly = soLeitura;
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
  let nomeDoArquivoDestino = "./Livro.csv";
let textoCSV = "";
for (let i = 0; i < listaLivro.length; i++) {
const linha = listaLivro[i];
textoCSV += linha.codigo+";"+
linha.titulo+";"+
linha.autor+";"+
linha.anopublicacao+";"+
linha.genero+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaLivro =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaLivro.push({
codigo: dados[0],
titulo: dados[1],
autor: dados[2],
anopublicacao: dados[3],
genero: dados[4]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}
function Pgenero(listaLivro) {
    let genero=document.getElementById("")
}