let listaAluno= [];
let oQueEstaFazendo = '';
let aluno= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaAluno.length; i++) {
   const aluno = listaAluno[i];

   if (aluno.Ra== chave) {

aluno.posicaoNaLista = i;

   return listaAluno[i];
  }
  }
  return null;
  }

function procure() {
  const Ra = document.getElementById("inputRa").value;

  if (isNaN(Ra) || !Number.isInteger(Number(Ra))) {

  mostrarAviso("Precisa ser um número inteiro");
  document.getElementById("inputRa").focus();
  return;
  }

  if(Ra) {
aluno = procurePorChavePrimaria(Ra)

  if (aluno) {
    mostrarDadosAluno(aluno)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputRa").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputRa").focus();

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
  let Ra;
  if (aluno == null){
Ra =  parseInt(document.getElementById("inputRa").value);
  } else {
Ra = aluno.Ra;
  }

const Nome= document.getElementById("inputNome").value;
const DataNascimento= document.getElementById("inputDataNascimento").value;
const Matriculado= document.getElementById("inputMatriculado").checked;
const Curso= document.getElementById("inputCurso").value;
  if(Ra>0 && Nome && DataNascimento && Curso) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
aluno = new Aluno(Ra,Nome,DataNascimento,Matriculado,Curso);
listaAluno.push(aluno);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
alunoAlterado = new Aluno(Ra,Nome,DataNascimento,Matriculado,Curso);
listaAluno[aluno.posicaoNaLista] = alunoAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaAluno.length; i++) {

   if(aluno.posicaoNaLista != i) {
   novaLista.push(listaAluno[i]);
}
}
listaAluno = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputRa").focus();
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
linha.Ra+" - "+
linha.Nome+" - "+
linha.DataNascimento+" - "+
(linha.Matriculado ? "Sim" : "Não")+" - "+
linha.Curso+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaAluno);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosAluno(aluno){
document.getElementById("inputRa").value = aluno.Ra;
document.getElementById("inputNome").value = aluno.Nome;
document.getElementById("inputDataNascimento").value = aluno.DataNascimento;
document.getElementById("inputMatriculado").value = aluno.Matriculado;
document.getElementById("inputCurso").value = aluno.Curso;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputNome").value = "";
document.getElementById("inputDataNascimento").value = "";
document.getElementById("inputMatriculado").value = "";
document.getElementById("inputCurso").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputRa").readOnly = !soLeitura;
document.getElementById("inputNome").readOnly = soLeitura;
document.getElementById("inputDataNascimento").readOnly = soLeitura;
document.getElementById("inputMatriculado").readOnly = soLeitura;
document.getElementById("inputCurso").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputRa").focus();
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
  let nomeDoArquivoDestino = "./Aluno.csv";
let textoCSV = "";
for (let i = 0; i < listaAluno.length; i++) {
const linha = listaAluno[i];
textoCSV += linha.Ra+";"+
linha.Nome+";"+
linha.DataNascimento+";"+
(linha.Matriculado ? "Sim" : "Não")+";"+
linha.Curso+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaAluno =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaAluno.push({
Ra: dados[0],
Nome: dados[1],
DataNascimento: dados[2],
Matriculado: dados[3],
Curso: dados[4]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}