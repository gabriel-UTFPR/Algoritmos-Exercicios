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

            if(coluna<colunas-1) {
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
        function somatodos(){
           
            resultado= soma(matriz);
            document.getElementById("soma").innerHTML=resultado;
        }
        function soma(matriz){
             debugger
             let soma=0;
            for(let i=0; i<matriz.length;i++ ){
                for(let j=0;j<matriz[i].length;j++){
                    soma+=matriz[i][j];

                }

            }
            return soma
        }
        
        function somacoluna() {
            
            let resultado= somavertical(matriz);

            document.getElementById("somacoluna").innerHTML=resultado;
        }
       
        function somavertical(matriz) {
            let soma=0;
            let j=parseInt(document.getElementById("coluna").value);
            for(let i=0; i<matriz.length;i++ ){
               
                    soma+=matriz[i][j];

                

            }
            return soma
        }
         function medialinha() {
            
            let resultado= media(matriz);

            document.getElementById("medialinha").innerHTML=resultado;
        }
       
        function media(matriz) {
        
            let media=0;
            let soma=0;
            let i=parseInt(document.getElementById("linha").value);
            for(let j=0; j<matriz[i].length;j++ ){
               
                    soma+=matriz[i][j];

                

            }
            media= soma/matriz[i].length
            return media.toFixed(2);
        }
        function pares(){
            vetor=[];
             for(let i=0; i<matriz.length;i++ ){
                for(let j=0;j<matriz[i].length;j++){
                   if(matriz[i][j]%2===0){
                    vetor.push(matriz[i][j]);
                   }

                }

            }
             document.getElementById("vetorpares").innerHTML="["+vetor+"]";
        }
         function ehprimo(matriz){
             let cont=0;
            
                if(matriz[i][j]%i==0){
                    cont=cont++
                }
            
            if(cont==2){
                return true;
            }else{
                return false;
            }
          

         }
        
        
        
        function primo(){
            let cont=0;
            for(let i=0; i<matriz.length;i++ ){
                for(let j=0;j<matriz[i].length;j++){
                       if(ehprimo(matriz[i][j])){
                         cont++
                        }
                   }
                }
        document.getElementById("primos").innerHTML=cont;
        }
            
        