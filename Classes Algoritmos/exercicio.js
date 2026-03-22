
let lista=[]; 
   
   function lerdados() {
    debugger
   
    let placa= document.getElementById("placa").value;
    let modelo= document.getElementById("modelo").value;
    let marca= document.getElementById("marca").value;
    let ano= parseInt(document.getElementById("ano").value);
    
    class Carro {
        constructor(placa,modelo,marca,ano) {
            this.placa=placa;
            this.modelo=modelo;
            this.marca=marca;
            this.ano=ano;
        }
    }
    
    let carro= new Carro(placa,modelo,marca,ano);
    lista.push(carro);
   }
    
    function listarcarros(){
           debugger
            let listagem = "<br>";
            for (let i = 0; i < lista.length; i++) {
                const linha = lista[i];
                listagem += linha.placa+" - "+ linha.modelo
                + " - "+ linha.marca+"-"+linha.ano+ "<br>"                
            }
            
        }
        
        function procurar() {
            let Marca=document.getElementById("pmarca").value.toLowerCase();
            
            let listagem = "<br>";
            for (let i = 0; i < lista.length; i++) {
                const linha = lista[i];
                if(linha.marca==Marca){
                    listagem += linha.placa+" - "+ linha.modelo
                + " - "+ linha.marca+"-"+linha.ano+ "<br>"                
            }
            document.getElementById("lista").innerHTML = listagem;

            
        }
    }