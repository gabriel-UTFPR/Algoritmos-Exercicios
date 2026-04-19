let listaEspecialidadeMedica= [];
let oQueEstaFazendo = '';
let especialidademedica= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaEspecialidadeMedica.length; i++) {
   const especialidademedica = listaEspecialidadeMedica[i];

   if (especialidademedica.idEspecialidade== chave) {

especialidademedica.posicaoNaLista = i;

   return listaEspecialidadeMedica[i];
  }
  }
  return null;
  }

function procure() {
  const idEspecialidade = document.getElementById("inputidEspecialidade").value;

  if (isNaN(idEspecialidade) || !Number.isInteger(Number(idEspecialidade)) || idEspecialidade<0) {

  mostrarAviso("Precisa ser um número inteiro e positivo");
  document.getElementById("inputidEspecialidade").focus();
  return;
  }

  if(idEspecialidade) {
especialidademedica = procurePorChavePrimaria(idEspecialidade)

  if (especialidademedica) {
    mostrarDadosEspecialidadeMedica(especialidademedica)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputidEspecialidade").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputidEspecialidade").focus();

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
  let idEspecialidade;
  if (especialidademedica == null){
idEspecialidade =  parseInt(document.getElementById("inputidEspecialidade").value);
  } else {
idEspecialidade = especialidademedica.idEspecialidade;
  }

const nomeEspecialidade= document.getElementById("inputnomeEspecialidade").value;
if (nomeEspecialidade.length<3) {
    alert("mínimo 3 caracteres no nome")
    document.getElementById("inputnomeEspecialidade").focus();
    return
}
const areaAtuacao= document.getElementById("inputareaAtuacao").value;
const tempoFormacaoAnos= parseInt(document.getElementById("inputtempoFormacaoAnos").value);
if (tempoFormacaoAnos<2) {
    alert(" tempo de formação deve ser maior ou igual a 2")
    document.getElementById("inputtempoFormacaoAnos").focus();
    return
}
const conselhoRegional= document.getElementById("inputconselhoRegional").value;
  if(idEspecialidade && nomeEspecialidade && areaAtuacao && tempoFormacaoAnos && conselhoRegional) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
especialidademedica = new EspecialidadeMedica(idEspecialidade,nomeEspecialidade,areaAtuacao,tempoFormacaoAnos,conselhoRegional);
listaEspecialidadeMedica.push(especialidademedica);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
let especialidademedicaAlterado = new EspecialidadeMedica(idEspecialidade,nomeEspecialidade,areaAtuacao,tempoFormacaoAnos,conselhoRegional);
listaEspecialidadeMedica[especialidademedica.posicaoNaLista] = especialidademedicaAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaEspecialidadeMedica.length; i++) {

   if(especialidademedica.posicaoNaLista != i) {
   novaLista.push(listaEspecialidadeMedica[i]);
}
}
listaEspecialidadeMedica = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputidEspecialidade").focus();
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
linha.idEspecialidade+" - "+
linha.nomeEspecialidade+" - "+
linha.areaAtuacao+" - "+
linha.tempoFormacaoAnos+" - "+
linha.conselhoRegional+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaEspecialidadeMedica);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosEspecialidadeMedica(especialidademedica){
document.getElementById("inputidEspecialidade").value = especialidademedica.idEspecialidade;
document.getElementById("inputnomeEspecialidade").value = especialidademedica.nomeEspecialidade;
document.getElementById("inputareaAtuacao").value = especialidademedica.areaAtuacao;
document.getElementById("inputtempoFormacaoAnos").value = especialidademedica.tempoFormacaoAnos;
document.getElementById("inputconselhoRegional").value = especialidademedica.conselhoRegional;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputnomeEspecialidade").value = "";
document.getElementById("inputareaAtuacao").value = "";
document.getElementById("inputtempoFormacaoAnos").value = "";
document.getElementById("inputconselhoRegional").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputidEspecialidade").readOnly = !soLeitura;
document.getElementById("inputnomeEspecialidade").readOnly = soLeitura;
document.getElementById("inputareaAtuacao").readOnly = soLeitura;
document.getElementById("inputtempoFormacaoAnos").readOnly = soLeitura;
document.getElementById("inputconselhoRegional").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputidEspecialidade").focus();
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
  let nomeDoArquivoDestino = "./EspecialidadeMedica.csv";
let textoCSV = "";
for (let i = 0; i < listaEspecialidadeMedica.length; i++) {
const linha = listaEspecialidadeMedica[i];
textoCSV += linha.idEspecialidade+";"+
linha.nomeEspecialidade+";"+
linha.areaAtuacao+";"+
linha.tempoFormacaoAnos+";"+
linha.conselhoRegional+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaEspecialidadeMedica =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaEspecialidadeMedica.push({
idEspecialidade: dados[0],
nomeEspecialidade: dados[1],
areaAtuacao: dados[2],
tempoFormacaoAnos: dados[3],
conselhoRegional: dados[4]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}