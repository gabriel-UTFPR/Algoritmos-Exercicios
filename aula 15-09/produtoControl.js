
let listaDeProdutos = []; //variável global que armazena os produtos cadastrados

// ao iniciar/atualizar a página html chama a função para inserir os dados iniciais
window.onload = inserirDadosIniciais();
function inserirDadosIniciais() { //esta função será excluída quando terminarem os testes
    listaDeProdutos = [];
    listaDeProdutos.push(new Produto(1, "Queijo Mussarela", 39.99, 50, "Frios", "kg"));
    listaDeProdutos.push(new Produto(3, "Salame", 45.00, 20, "Frios", "kg"));
    listaDeProdutos.push(new Produto(4, "Mortadela", 25.50, 40, "Frios", "kg"));
    listaDeProdutos.push(new Produto(6, "Peito de Peru", 45.00, 15, "Frios", "kg"));
    listaDeProdutos.push(new Produto(7, "Refrigerante Cola", 5.99, 100, "Bebidas", "litro"));
    listaDeProdutos.push(new Produto(8, "Suco de Laranja", 8.50, 50, "Bebidas", "litro"));
    listaDeProdutos.push(new Produto(9, "Detergente Líquido", 3.49, 200, "Limpeza", "unidade"));
    listaDeProdutos.push(new Produto(10, "Sabão em Pó", 15.00, 80, "Limpeza", "kg"));
    listaDeProdutos.push(new Produto(11, "Pão Francês", 12.00, 60, "Padaria", "kg"));
    listaDeProdutos.push(new Produto(12, "Bolo de Chocolate", 30.00, 10, "Padaria", "unidade"));
}

function gerarPrint(vetor) {
    let resp = "";
    for (let i = 0; i < vetor.length; i++) {
        const prod = vetor[i];
        resp += prod.id + " - " + prod.nome + " - " + prod.precoUnitario + " - " +
            prod.quantidadeEstoque + " - " + prod.categoria + " - " + prod.unidadeDeMedida + "<br>"
    }
    return resp;
}

function inserirProduto() {
    let id= parseInt(document.getElementById("id").value);
    let nome= document.getElementById("nome").value;
    let precoUnitario= parseFloat(document.getElementById("precoUnitario").value);
    let quantidadeEstoque= parseInt(document.getElementById("quantidadeEstoque").value);
    let categoria= document.getElementById("categoria").value;
    let unidadeDeMedida= document.getElementById("unidadeDeMedida").value;

    let novoProduto= new Produto(id,nome,precoUnitario,quantidadeEstoque,categoria,unidadeDeMedida);
    listaDeProdutos.push(novoProduto);

    document.getElementById("id").innerHTML="";
} // adicione um produto na lista.

function listarProdutos() {
    document.getElementById("outputLista").innerHTML=gerarPrint(listaDeProdutos);
    
} 

//  listar todos os produtos cadastrados

function valorTotalDoEstoque() {
    let valorEstoque=0;
    for (let i = 0; i < listaDeProdutos.length; i++) {
        const p= listaDeProdutos[i];
       valorEstoque+= p.precoUnitario*p.quantidadeEstoque;
    }
    document.getElementById("outputLista").innerHTML="R$"+valorEstoque.toFixed(2);

} 

//  - calcular e mostrar o valor total do estoque. Deve-se considerar as quantidades e os preços dos produtos na lista.

function mostreProdutosDeUmaCategoria() {
    debugger
    let qualCategoria=document.getElementById("inputQualCategoria").value;
    let resp="";
    for (let i = 0; i < listaDeProdutos.length; i++) {
       let c= listaDeProdutos[i];
       if(qualCategoria==c.categoria){
        resp+=c.id+"-"+c.nome+"-R$ "+c.precoUnitario+"-"+c.quantidadeEstoque+"-"+c.categoria+"-"+c.unidadeDeMedida+"<br>";

        }
    }

   document.getElementById("outputLista").innerHTML = resp;
    
} // - mostrar os produtos de uma determinada categoria.

function filtrarProdutosPorPreco() {
    let min=parseFloat(document.getElementById("inputmin").value);
    let max=parseFloat(document.getElementById("inputmax").value);
    let resp="";

    for (let i = 0; i < listaDeProdutos.length; i++) {
       let c= listaDeProdutos[i];
       if(c.precoUnitario>=min && c.precoUnitario<=max){
        resp+=c.id+"-"+c.nome+"-R$ "+c.precoUnitario+"-"+c.quantidadeEstoque+"-"+c.categoria+"-"+c.unidadeDeMedida+"<br>";

        }
    }
    if(resp!==""){
        document.getElementById("outputLista").innerHTML = resp;
    }else{
        alert("Não há produtos nessa faixa de preço")
    }
}
// - filtrar os produtos que estão dentro de uma faixa de preço (mínimo e máximo) informada pelo usuário.


// usar bubble sort nos dois métodos abaixo
function ordenarProdutosPorNome() { } // - ordenar os produtos por nome (ordem alfabética) e mostrar a lista ordenada.

function ordenarProdutosPorPreco() { } // - ordenar os produtos por preço (ordem crescente) e mostrar a lista ordenada.
