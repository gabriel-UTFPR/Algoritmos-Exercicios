
let matriz = [];
let linhas = 0;
let colunas = 0;
let linha = 0;
let coluna = 0;
let posAtual = 0;

function iniciarMatriz() {
    linhas = parseInt(document.getElementById("inputLinhas").value);
    colunas = parseInt(document.getElementById("inputColunas").value);

    matriz = [];
    for (let i = 0; i < linhas; i++) {
        let linha = [];
        for (let j = 0; j < colunas; j++) {
            linha.push(0); // Inicializa com zero
        }
        matriz.push(linha);
    }

    posAtual = 0;
    // Habilita os campos
    document.getElementById("inputNumero").disabled = false;
    document.getElementById("btnAdicionar").disabled = false;

    atualizarSaida();
    document.getElementById("inputNumero").focus();
}

function adicionarNumero() {
    if (posAtual >= linhas * colunas) {
        alert("A matriz já está completa.");
        return;
    }

    let input = document.getElementById("inputNumero");
    let valor = parseFloat(input.value);

    matriz[linha][coluna] = valor;

    if (coluna < colunas - 1) {
        coluna++;
    } else {
        coluna = 0;
        linha++;
    }
    posAtual++;

    atualizarSaida();

    input.value = "";
    input.focus();

    if (posAtual >= linhas * colunas) {
        input.disabled = true;
        document.getElementById("btnAdicionar").disabled = true;
    }
}

function atualizarSaida() {
    let texto = "";
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[i].length; j++) {
            let valor = matriz[i][j];
            if (valor === "") {
                texto += "_";
            } else {
                texto += valor;
            }
            texto += " ";
        }
        texto += "\n";
    }
    document.getElementById("saidaMatriz").innerText = texto;
}


function somarTodos(matriz){
    let soma = 0;
    for (let i = 0; i < matriz.length; i++) {
        for (let j = 0; j < matriz[0].length; j++) {
            soma += matriz[i][j];            
        }        
    }
    return soma;
}

function somarTodosOsElementos(){
    let resultado = somarTodos(matriz);
    document.getElementById("spanSomaTodos").innerHTML = resultado;
}

function somarColuna(coluna, matriz){
    let soma = 0;
    for (let i = 0; i < matriz.length; i++) {
        soma += matriz[i][coluna];        
    }
    return soma;
}

function botaoSomarColuna(){
    let coluna =parseInt(document.getElementById("inputNumeroDaColuna").value);
    let resultado = somarColuna(coluna,matriz);
    document.getElementById("spanSomaColuna").innerHTML = resultado;
}

function botaomedia(){
    let linha=parseInt(document.getElementById("inputNumeroDalinha").value);
    let resultado=calculomedia(linha,matriz);
    document.getElementById("spanmedia").innerHTML=resultado;
}

function calculomedia(linha,matriz){
    let soma=0;
    for(let i=0;i<matriz[0].length;i++){
        soma+= matriz[linha][i];
    }
    let media= soma/matriz[0].length;
    return media;
}

function botaopares(){
   let vetor=[];
    for (let i = 0; i < matriz.length; i++) {
       for (let j = 0; j < matriz[0].length; j++) {
         if (matriz[i][j]%2==0) {
             vetor.push(matriz[i][j]);
           }
       } 
    }
    document.getElementById("spanpares").innerHTML=vetor;
}

function botaoprimo() {
    let cont=0;
    for (let i = 0; i < matriz.length; i++) {
       for (let j = 0; j < matriz[0].length; j++) {
            if (ehprimo(matriz[i][j])) {
                cont++
            }
       } 
    }
    document.getElementById("spanprimo").innerHTML=cont;
}

function ehprimo(num) {
    let cont=0;
    for (let i = 1; i <= num; i++) {
        if (num%i==0) {
            cont++;
        }  
    }
    if (cont==2) {
        return true;
    }else{
        return false
    }
}

function maior(){
    let maioral=matriz[0][0];
    let l=0;
    let c=0;
    for (let i = 0; i < matriz.length; i++) {
       for (let j = 0; j < matriz[0].length; j++) {
            if (maioral<matriz[i][j]) {
                maioral=matriz[i][j];
                l=i
                c=j
            }
       } 
    }
    
    document.getElementById("spanmaior").innerHTML="O maior é "+maioral+" na posição "+ l+","+c;
}
function multiplique() {
    let linhaa=parseInt(document.getElementById("linhaA").value);
    let colunaa=parseInt(document.getElementById("colunaA").value);
    let linhab=parseInt(document.getElementById("linhaB").value);
    let colunab=parseInt(document.getElementById("colunaB").value);
    
    let mult=matriz[linhaa][colunaa]*matriz[linhab][colunab];
     document.getElementById("spanmultiplicado").innerHTML=mult;

}

function  separarimparesdospares() {
   debugger
    let impares=[];
    let pares=[];
     for (let i = 0; i < matriz.length; i++) {
       for (let j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j]%2==0) {
                pares.push(matriz[i][j]);
            }else{
                impares.push(matriz[i][j])
            }
       } 
    }
    document.getElementById("spanimpares").innerHTML=impares;
    document.getElementById("pares").innerHTML=pares;
}

function procurar() {
    let encontrado= false;
    let elemento=parseInt(document.getElementById("elemento").value);
    let linha=0;
    let coluna=0;
    for (let i = 0; i < matriz.length; i++) {
       for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j]===elemento) {
                encontrado=true;
                linha=i;
                coluna=j;
            }
        } 
   }
    if(encontrado){
        document.getElementById("spanposiçao").innerHTML="O elemento está na linha "+ linha+ ", coluna "+coluna;
}else{
 document.getElementById("spanposiçao").innerHTML="Elemento não encontrado na matriz"
} 
}

function procurarcontar() {
    let encontrado= false;
    let elemento=parseInt(document.getElementById("element").value);
    let cont= 0;
    for (let i = 0; i < matriz.length; i++) {
       for (let j = 0; j < matriz[0].length; j++) {
            if (matriz[i][j]===elemento) {
                encontrado=true;
                cont++;
            }
        } 
   }
    if(encontrado){
        document.getElementById("spanvezes").innerHTML="O elemento foi encontrado "+cont+" vezes"  ;
}else{
 document.getElementById("spanvezes").innerHTML="Elemento não encontrado na matriz"
} 
}
