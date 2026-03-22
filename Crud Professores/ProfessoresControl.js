let listaProfessores= [];
let oQueEstaFazendo = '';
let professores= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaProfessores.length; i++) {
   const professores = listaProfessores[i];

   if (professores.idProf== chave) {

professores.posicaoNaLista = i;

   return listaProfessores[i];
  }
  }
  return null;
  }

function procure() {
  debugger
    const idProf = document.getElementById("inputidProf").value;

  if (isNaN(idProf) || !Number.isInteger(Number(idProf))|| idProf<0) {

  mostrarAviso("Precisa ser um número inteiro positivo");
  document.getElementById("inputidProf").focus();
  return;
  }

  if(idProf) {
professores = procurePorChavePrimaria(idProf)

  if (professores) {
    mostrarDadosProfessores(professores)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputidProf").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputidProf").focus();

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
  let idProf;
  if (professores == null){
idProf =  parseInt(document.getElementById("inputidProf").value);
  } else {
idProf = professores.idProf;
  }

const nome= document.getElementById("inputnome").value;
if (nome == "") {
    alert("O nome do professor NÃO pode estar vazio");
    document.getElementById("inputnome").focus();
    return;
}
const disciplina= document.getElementById("inputdisciplina").value;
const tempoExperiencia= parseInt(document.getElementById("inputtempoExperiencia").value);
if ( tempoExperiencia<1) {
    alert("O tempo de experiência NÃO pode ser inferior a 1");
    document.getElementById("inputtempoexperiencia").focus();
    return;
}
const titulaçao= document.getElementById("inputtitulaçao").value;
const aposentado= (document.getElementById("inputaposentado").checked) ? "Sim" : "Não";
const dataContrataçao= Formatardata(document.getElementById("inputdataContrataçao").value);
  if(idProf && nome && disciplina && tempoExperiencia && titulaçao && aposentado && dataContrataçao) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
professores = new Professores(idProf,nome,disciplina,tempoExperiencia,titulaçao,aposentado,dataContrataçao);
listaProfessores.push(professores);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
let professoresAlterado = new Professores(idProf,nome,disciplina,tempoExperiencia,titulaçao,aposentado,dataContrataçao);
listaProfessores[professores.posicaoNaLista] = professoresAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaProfessores.length; i++) {

   if(professores.posicaoNaLista != i) {
   novaLista.push(listaProfessores[i]);
}
}
listaProfessores = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputidProf").focus();
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
linha.idProf+" - "+
linha.nome+" - "+
linha.disciplina+" - "+
linha.tempoExperiencia+" - "+
linha.titulaçao+" - "+
linha.aposentado+" - "+
linha.dataContrataçao+" <br> ";
}
return texto;
}

function listar() {
    
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaProfessores);
}
function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosProfessores(professores){
document.getElementById("inputidProf").value = professores.idProf;
document.getElementById("inputnome").value = professores.nome;
document.getElementById("inputdisciplina").value = professores.disciplina;
document.getElementById("inputtempoExperiencia").value = professores.tempoExperiencia;
document.getElementById("inputtitulaçao").value = professores.titulaçao;
if (professores.aposentado=='Sim') {
    document.getElementById("inputaposentado").checked = true ;
}else if(professores.aposentado=='Não'){
 document.getElementById("inputaposentado").checked = false ;
}
document.getElementById("inputdataContrataçao").value = (professores.dataContrataçao).split('/').reverse().join('-');
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputnome").value = "";
document.getElementById("inputdisciplina").value = "";
document.getElementById("inputtempoExperiencia").value = "";
document.getElementById("inputtitulaçao").value = "";
document.getElementById("inputaposentado").checked = false;
document.getElementById("inputdataContrataçao").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputidProf").readOnly = !soLeitura;
document.getElementById("inputnome").readOnly = soLeitura;
document.getElementById("inputdisciplina").readOnly = soLeitura;
document.getElementById("inputtempoExperiencia").readOnly = soLeitura;
document.getElementById("inputtitulaçao").readOnly = soLeitura;
document.getElementById("inputaposentado").readOnly = soLeitura;
document.getElementById("inputdataContrataçao").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputidProf").focus();
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
  let nomeDoArquivoDestino = "./Professores.csv";
let textoCSV = "";
for (let i = 0; i < listaProfessores.length; i++) {
const linha = listaProfessores[i];
textoCSV += linha.idProf+";"+
linha.nome+";"+
linha.disciplina+";"+
linha.tempoExperiencia+";"+
linha.titulaçao+";"+
linha.aposentado+";"+
linha.dataContrataçao+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaProfessores =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===7) {
listaProfessores.push({
idProf: dados[0],
nome: dados[1],
disciplina: dados[2],
tempoExperiencia: dados[3],
titulaçao: dados[4],
aposentado: dados[5],
dataContrataçao: dados[6]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}
function Formatardata(dataISO){
const partes = dataISO.split('-');
const ano = partes[0];
const mes = partes[1];
const dia = partes[2];
return `${dia}/${mes}/${ano}`;
}
function ListarProfessores() {
    let ltitulaçao= document.getElementById("titulaçao").value;
    let listaTitulaçao= [];
    for (let i = 0; i < listaProfessores.length; i++) {
        let p= listaProfessores[i];
        if(ltitulaçao == p.titulaçao){
            listaTitulaçao.push(p);
        }   
    }
    resp= preparaListagem(listaTitulaçao);
    alert(resp)
    document.getElementById("outputSaida").innerHTML=resp;
}
