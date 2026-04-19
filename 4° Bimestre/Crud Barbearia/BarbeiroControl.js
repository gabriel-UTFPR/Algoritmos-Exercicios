let listaBarbeiro= [];
let oQueEstaFazendo = '';
let barbeiro= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaBarbeiro.length; i++) {
   const barbeiro = listaBarbeiro[i];

   if (barbeiro.idBarbeiro== chave) {

barbeiro.posicaoNaLista = i;

   return listaBarbeiro[i];
  }
  }
  return null;
  }

function procure() {
  const idBarbeiro = document.getElementById("inputidBarbeiro").value;

  if (isNaN(idBarbeiro) || !Number.isInteger(Number(idBarbeiro))) {

  mostrarAviso("Precisa ser um número inteiro");
  document.getElementById("inputidBarbeiro").focus();
  return;
  }

  if(idBarbeiro) {
barbeiro = procurePorChavePrimaria(idBarbeiro)

  if (barbeiro) {
    mostrarDadosBarbeiro(barbeiro)
    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');
    mostrarAviso("Achou na lista, pode alterar ou excluir");
    } else {
    limparAtributos();
    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
    mostrarAviso("Não achou na lista, pode inserir");
    }
    } else {
    document.getElementById("inputidBarbeiro").focus();
    return;
   }
   }

function inserir() {

bloquearAtributos(false);
visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');
oQueEstaFazendo = 'inserindo';
mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
document.getElementById("inputidBarbeiro").focus();

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
  let idBarbeiro;
  if (barbeiro == null){
idBarbeiro =  parseInt(document.getElementById("inputidBarbeiro").value);
  } else {
idBarbeiro = barbeiro.idBarbeiro;
  }

const nome= document.getElementById("inputnome").value;
let nomesplit= nome.split(" ");
if(nomesplit.length<2){
     alert("O nome deve ter no minimo 2 palavras");
    document.getElementById("inputnome").focus();
    return;
}
const especialidade= document.getElementById("inputespecialidade").value;
const tempoExperiencia= parseInt(document.getElementById("inputtempoExperiencia").value);
if(tempoExperiencia<0 || tempoExperiencia>60){
     alert("O tempo de experiência NÃO pode ser negativo nem superior a 60");
    document.getElementById("inputtempoexperiencia").focus();
    return;
}
const nivel= document.getElementById("inputnivel").value;
const atuando= (document.getElementById("inputatuando").checked) ? "Sim" : "Não";
const dataAdmissao= Formatardata(document.getElementById("inputdataAdmissao").value);
const hoje = new Date().toISOString().split("T")[0];
  if ((barbeiro.dataAdmissao).split('/').reverse().join('-') > hoje) {
    alert("A data não pode ser futura à data atual!");
    return;
  }
  if(idBarbeiro && nome && especialidade && tempoExperiencia && nivel && atuando && dataAdmissao) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
barbeiro = new Barbeiro(idBarbeiro,nome,especialidade,tempoExperiencia,nivel,atuando,dataAdmissao);
listaBarbeiro.push(barbeiro);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
let barbeiroAlterado = new Barbeiro(idBarbeiro,nome,especialidade,tempoExperiencia,nivel,atuando,dataAdmissao);
listaBarbeiro[barbeiro.posicaoNaLista] = barbeiroAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaBarbeiro.length; i++) {

   if(barbeiro.posicaoNaLista != i) {
   novaLista.push(listaBarbeiro[i]);
}
}
listaBarbeiro = novaLista;
mostrarAviso("EXCLUIDO");
break;
default:

mostrarAviso("Erro aleatório");
}
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
limparAtributos();
listar();
document.getElementById("inputidBarbeiro").focus();
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
linha.idBarbeiro+" - "+
linha.nome+" - "+
linha.especialidade+" - "+
linha.tempoExperiencia+" - "+
linha.nivel+" - "+
linha.atuando+" - "+
linha.dataAdmissao+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaBarbeiro);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosBarbeiro(barbeiro){
document.getElementById("inputidBarbeiro").value = barbeiro.idBarbeiro;
document.getElementById("inputnome").value = barbeiro.nome;
document.getElementById("inputespecialidade").value = barbeiro.especialidade;
document.getElementById("inputtempoExperiencia").value = barbeiro.tempoExperiencia;
document.getElementById("inputnivel").value = barbeiro.nivel;
if (barbeiro.atuando=='Sim') {
    document.getElementById("inputatuando").checked = true;
}else if(barbeiro.atuando=='Não'){
    document.getElementById("inputatuando").checked = false;
}
document.getElementById("inputdataAdmissao").value = (barbeiro.dataAdmissao).split('/').reverse().join('-');
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputnome").value = "";
document.getElementById("inputespecialidade").value = "";
document.getElementById("inputtempoExperiencia").value = "";
document.getElementById("inputnivel").value = "";
document.getElementById("inputatuando").checked = false;
document.getElementById("inputdataAdmissao").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputidBarbeiro").readOnly = !soLeitura;
document.getElementById("inputnome").readOnly = soLeitura;
document.getElementById("inputespecialidade").readOnly = soLeitura;
document.getElementById("inputtempoExperiencia").readOnly = soLeitura;
document.getElementById("inputnivel").readOnly = soLeitura;
document.getElementById("inputatuando").readOnly = soLeitura;
document.getElementById("inputdataAdmissao").readOnly = soLeitura;
}

function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
document.getElementById("btProcure").style.display = btProcure;
document.getElementById("btInserir").style.display = btInserir;
document.getElementById("btAlterar").style.display = btAlterar;
document.getElementById("btExcluir").style.display = btExcluir;
document.getElementById("btSalvar").style.display = btSalvar;
document.getElementById("btCancelar").style.display = btSalvar;
document.getElementById("inputidBarbeiro").focus();
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
  let nomeDoArquivoDestino = "./Barbeiro.csv";
let textoCSV = "";
for (let i = 0; i < listaBarbeiro.length; i++) {
const linha = listaBarbeiro[i];
textoCSV += linha.idBarbeiro+";"+
linha.nome+";"+
linha.especialidade+";"+
linha.tempoExperiencia+";"+
linha.nivel+";"+
linha.atuando+";"+
linha.dataAdmissao+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaBarbeiro =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===7) {
listaBarbeiro.push({
idBarbeiro: dados[0],
nome: dados[1],
especialidade: dados[2],
tempoExperiencia: dados[3],
nivel: dados[4],
atuando: dados[5],
dataAdmissao: dados[6]
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
function procurar() {
    let nomel= document.getElementById("nome").value;
    let vetbarb=[];
    for (let i = 0; i < listaBarbeiro.length; i++) {
       let p= listaBarbeiro[i];
        if (nomel==p.nome) {
        vetbarb.push(p);
       }   
    }
 resp= preparaListagem(vetbarb);
  document.getElementById("outputSaida").innerHTML=resp;
}
function filtrar() {
    let especialidadel= document.getElementById("especialidade").value;
    let vetesp=[];
    for (let i = 0; i < listaBarbeiro.length; i++) {
       let p= listaBarbeiro[i];
        if (especialidadel==p.especialidade) {
        vetesp.push(p);
       }   
    }
 resp= preparaListagem(vetesp);
  document.getElementById("outputSaida").innerHTML=resp;
}
function listafaixa() {
     let ano1= parseInt(document.getElementById("ano1").value);
     let ano2= parseInt(document.getElementById("ano2").value);
    let vetfaixa=[];
    for (let i = 0; i < listaBarbeiro.length; i++) {
       let p= listaBarbeiro[i];
        if (parseInt(p.tempoExperiencia)>=ano1 && parseInt(p.tempoExperiencia)<=ano2 ) {
        vetfaixa.push(p);
       }   
    }
 resp= preparaListagem(vetfaixa);
  document.getElementById("outputSaida").innerHTML=resp;
}
function filtrarsobrenome() {
    
    let sobrenome= document.getElementById("sobrenome").value;
    let vetsobrenome=[];
    for (let i = 0; i < listaBarbeiro.length; i++) {
       let p= listaBarbeiro[i];
       let nomel=p.nome
       let vetsobr= nomel.split(" ");
       for (let i = 0; i < vetsobr.length; i++) {
        if (i==vetsobr.length-1) {
            sobrenomeatual=vetsobr[i]
        }
       }
       if (sobrenome==sobrenomeatual) {
        vetsobrenome.push(p);
       }   
    }
 resp= preparaListagem(vetsobrenome);
  document.getElementById("outputSaida").innerHTML=resp;
}