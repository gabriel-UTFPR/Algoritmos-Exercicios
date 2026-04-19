let listaAnimal= [];
let oQueEstaFazendo = '';
let animal= null;
bloquearAtributos(true);
function procurePorChavePrimaria(chave) {
   for (let i = 0; i < listaAnimal.length; i++) {
   const animal = listaAnimal[i];

   if (animal.id== chave) {

animal.posicaoNaLista = i;

   return listaAnimal[i];
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
animal = procurePorChavePrimaria(id)

  if (animal) {
    mostrarDadosAnimal(animal)
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
  if (animal == null){
id =  parseInt(document.getElementById("inputid").value);
  } else {
id = animal.id;
  }

const especie= document.getElementById("inputespecie").value;
const nome= document.getElementById("inputnome").value;
const idade= parseInt(document.getElementById("inputidade").value);
const peso= parseFloat(document.getElementById("inputpeso").value);
  if(id && especie && nome && idade && peso>0) {
    switch (oQueEstaFazendo) {
    case 'inserindo':
animal = new Animal(id,especie,nome,idade,peso);
listaAnimal.push(animal);
mostrarAviso("Inserido na lista");
break;
case 'alterando':
animalAlterado = new Animal(id,especie,nome,idade,peso);
listaAnimal[animal.posicaoNaLista] = animalAlterado;
mostrarAviso("Alterado");
break;
case 'excluindo':
  let novaLista = [];

for (let i = 0; i < listaAnimal.length; i++) {

   if(animal.posicaoNaLista != i) {
   novaLista.push(listaAnimal[i]);
}
}
listaAnimal = novaLista;
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
linha.especie+" - "+
linha.nome+" - "+
linha.idade+" - "+
linha.peso+" <br> ";
}
return texto;
}

function listar() {
 document.getElementById("outputSaida").innerHTML = preparaListagem(listaAnimal);
}function cancelarOperacao() {
 limparAtributos();
bloquearAtributos(true);
visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
 document.getElementById("divAviso").innerHTML = mensagem;
}

function mostrarDadosAnimal(animal){
document.getElementById("inputid").value = animal.id;
document.getElementById("inputespecie").value = animal.especie;
document.getElementById("inputnome").value = animal.nome;
document.getElementById("inputidade").value = animal.idade;
document.getElementById("inputpeso").value = animal.peso;
 bloquearAtributos(true);
}function limparAtributos() {
document.getElementById("inputespecie").value = "";
document.getElementById("inputnome").value = "";
document.getElementById("inputidade").value = "";
document.getElementById("inputpeso").value = "";
bloquearAtributos(true);
}
function bloquearAtributos(soLeitura) {
document.getElementById("inputid").readOnly = !soLeitura;
document.getElementById("inputespecie").readOnly = soLeitura;
document.getElementById("inputnome").readOnly = soLeitura;
document.getElementById("inputidade").readOnly = soLeitura;
document.getElementById("inputpeso").readOnly = soLeitura;
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
  let nomeDoArquivoDestino = "./Animal.csv";
let textoCSV = "";
for (let i = 0; i < listaAnimal.length; i++) {
const linha = listaAnimal[i];
textoCSV += linha.id+";"+
linha.especie+";"+
linha.nome+";"+
linha.idade+";"+
linha.peso+"\n";
}
 persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}
function converterDeCSVparaListaObjeto(arquivo) {
 const leitor = new FileReader();
leitor.onload = function (e) {
    const conteudo = e.target.result;
  const linhas = conteudo.split('\n');
 listaAnimal =[];
 for (let i = 0; i < linhas.length; i++) {
const linha = linhas[i].trim();
 if (linha) {
const dados = linha.split(';');
 if (dados.length ===5) {
listaAnimal.push({
id: dados[0],
especie: dados[1],
nome: dados[2],
idade: dados[3],
peso: dados[4]
});
}
}
}
 listar();
};
leitor.readAsText(arquivo);
}

function Maispesado() {
  let parrudo= listaAnimal[0];
  let p="";
  for (let i = 1; i < listaAnimal.length; i++) {
    p=listaAnimal[i];
    if (parrudo.peso<p.peso) {
      parrudo=listaAnimal[i];
    } 
  }
  document.getElementById("outputSaida2").innerHTML=parrudo;
}