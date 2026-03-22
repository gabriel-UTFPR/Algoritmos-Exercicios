let listaNotebook = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let notebook = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaNotebook.length; i++) {
        const notebook = listaNotebook[i];
        if (notebook.id == chave) {
            notebook.posicaoNaLista = i;
            return listaNotebook[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // se digitou um Id
        notebook = procurePorChavePrimaria(id);
        if (notebook) { //achou na lista
            mostrarDadosnotebook(notebook);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let id;
    if (notebook == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = notebook.id;
    }

    const modelo = document.getElementById("inputModelo").value;
    const datalançamento = document.getElementById("inputDatalançamento").value;
    const fabricante = document.getElementById("inputFabricante").value;
    const quantidadeRam = parseInt(document.getElementById("inputquantidadeRam").value);
    const processador = document.getElementById("inputProcessador").value;
    const fabricanteProcessador = document.getElementById("inputFabricanteProcessador").value;
    const armazenamentoPermanente= parseInt(document.getElementById("inputArmazenamentoPermanente").value);
    
    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (id && modelo && datalançamento && fabricante && quantidadeRam &&processador && fabricanteProcessador && armazenamentoPermanente) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                 notebook = new Notebook(id, modelo,datalançamento ,fabricante , quantidadeRam, processador, fabricanteProcessador, armazenamentoPermanente);
                listaNotebook.push(notebook);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
               let notebookAlterado = new Notebook(id, modelo,datalançamento ,fabricante , quantidadeRam, processador, fabricanteProcessador, armazenamentoPermanente);
                listaNotebook[notebook.posicaoNaLista] = notebookAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaNotebook.length; i++) {
                    if (notebook.posicaoNaLista != i) {
                        novaLista.push(listaNotebook[i]);
                    }
                }
                listaNotebook = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();
    } else {
        alert("Erro nos dados digitados");
        return;
    }
}

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.modelo +" - "+
            linha.datalançamento+ " - "+
            linha.fabricante+" - "+
            linha.quantidadeRam+" GB - "+
            linha.processador+" - "+
            linha.fabricanteProcessador+" - "+
            linha.armazenamentoPermanente+" GB <br>"
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaNotebook);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Pet nos campos
function mostrarDadosnotebook(notebook) {
    document.getElementById("inputId").value = notebook.id;
    document.getElementById("inputModelo").value = notebook.modelo;
    document.getElementById("inputDatalançamento").value = notebook.datalançamento;
    document.getElementById("inputFabricante").value = notebook.fabricante;
    document.getElementById("inputquantidadeRam").value=notebook.quantidadeRam;
    document.getElementById("inputProcessador").value=notebook.processador;
    document.getElementById("inputFabricanteProcessador").value=notebook.fabricanteProcessador;
    document.getElementById("inputArmazenamentoPermanente").value=notebook.armazenamentoPermanente;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputModelo").value = "";
    document.getElementById("inputDatalançamento").value="";
    document.getElementById("inputFabricante").value = "";
    document.getElementById("inputquantidadeRam").value="";
    document.getElementById("inputProcessador").value="";
    document.getElementById("inputFabricanteProcessador").value="";
    document.getElementById("inputArmazenamentoPermanente").value="";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;
    document.getElementById("inputModelo").readOnly = soLeitura;
    document.getElementById("inputDatalançamento").readOnly=soLeitura;
    document.getElementById("inputFabricante").readOnly = soLeitura;
    document.getElementById("inputquantidadeRam").readOnly=soLeitura;
    document.getElementById("inputProcessador").readOnly=soLeitura;
    document.getElementById("inputFabricanteProcessador").readOnly=soLeitura;
    document.getElementById("inputArmazenamentoPermanente").readOnly=soLeitura;

}

// Função para deixar visível ou invisível os botões
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputId").focus();
}

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
    /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
    criando um arquivo temporário*/
    const blob = new Blob([conteudo], { type: 'text/plain' });
    //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
    atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
    link.href = URL.createObjectURL(blob);
    link.download = arquivoDestino; // modelo do arquivo de download
    link.click(); //inicia o processo de dowload automaticamente
    // Libera o objeto URL
    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}


// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
function abrirArquivoSalvoEmLocalPermanente() {

    const input = document.createElement('input');
    //cria o elemento input do tipo file (serve para abrir o seletor de arquivos)
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
    input.onchange = function (event) {
        /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
        O evento change é disparado quando um arquivo é selecionado*/
        const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
        console.log(arquivo.name);
        
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
        /*verifica se um arquivo foi selecionado: 
        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
        permitindo que o arquivo seja lido e processado na função processarArquivo*/
    };
    input.click(); //seletor de arquivos exibido automaticamente    
}

function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let modeloDoArquivoDestino = "./Notebook.csv";  //define o modelo do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaNotebook.length; i++) {
        const linha = listaNotebook[i]; //variavel linha contem as informações de cada notebook
        textoCSV += linha.id + ";" +
        linha.modelo+";"+
        linha.datalançamento+";"+ 
        linha.fabricante+";"+
        linha.quantidadeRam+";"+
        linha.processador+";"+
        linha.fabricanteProcessador+";"+
        linha.armazenamentoPermanente+"\n"
    }
    persistirEmLocalPermanente(modeloDoArquivoDestino, textoCSV);
}


// Função para processar o arquivo CSV e transferir os dados para a listaPet
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaNotebook = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 8) { //verifica os seis campos
                    // Adiciona os dados à listaPet como um objeto
                    listaNotebook.push({
                        id: dados[0],
                        modelo: dados[1],
                        datalançamento: dados[2],
                        fabricante: dados[3],
                        quantidadeRam:dados[4],
                        processador:dados[5],
                        fabricanteProcessador: dados[6],
                        armazenamentoPermanente:dados[7]
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}
function procureRAM() {
   debugger
    let RAM= parseInt(document.getElementById("inputRAM").value);
    let lista="";
    for (let i = 0; i < listaNotebook.length; i++) {
        let p=listaNotebook[i];
        if (p.quantidadeRam>=RAM) {
            lista+= ListagemRam(i);
        } 
    }
    document.getElementById("outputSaida").innerHTML = lista;
}
function ListagemRam(i) {
    let texto = "";
    
        const linha =listaNotebook[i] ;
        texto +=
            linha.id + " - " +
            linha.modelo +" - "+
            linha.datalançamento+ " - "+
            linha.fabricante+" - "+
            linha.quantidadeRam+" GB - "+
            linha.processador+" - "+
            linha.fabricanteProcessador+" - "+
            linha.armazenamentoPermanente+" GB <br>"
    
    return texto;
}

