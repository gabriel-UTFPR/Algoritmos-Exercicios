let lista=[];
function adicionar() {
    debugger
    let nome=document.getElementById("produto").value;
    let quantidade=parseInt(document.getElementById("quantidade").value);
    let preço=parseFloat(document.getElementById("preço").value);

    let produtos= new Produtos(nome,quantidade,preço);
    
    let existe = false; 

    for (let i = 0; i < lista.length; i++) {
        let l = lista[i];
        if (produtos.nome === l.nome) {
            existe = true;
            break; 
        }
    }

    if (existe) {
        alert("Produto já está na lista");
    } else {
        lista.push(produtos);
    }

}

function subtotal() {
    debugger
   let resp="";
   for (let i = 0; i < lista.length; i++) {
       resp+= lista[i].nome+"-"+"R$"+(lista[i].quantidade*lista[i].preço).toFixed(2)+"<br>";
        
    }
    
    
    
    
    
    
     document.getElementById("subtotal").innerHTML=resp;
}



function listar(){
           debugger
            let listagem = "<br>";
            for (let i = 0; i < lista.length; i++) {
                const comprar = lista[i];
                listagem += comprar.nome+" - "+ comprar.quantidade
                + " - "+ comprar.preço+ comprar.subtotal+"<br>"                
            }
            document.getElementById("lista").innerHTML = listagem;
        }
        
