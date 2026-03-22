let VetorAtributo=""; 
let VetorTipo="";
let NomeClasse="";

function ReceberDados() {
  debugger
    VetorAtributo=document.getElementById("inputAtributos").value.split(",");
    VetorTipo=document.getElementById("inputTipo").value.split(",");
    NomeClasse=document.getElementById("inputNomeClasse").value;
    
    document.getElementById("btInserir").style.display = 'none';
    document.getElementById("btModel").style.display = 'inline';
    document.getElementById("btView").style.display = 'inline';
    document.getElementById("btControl").style.display = 'inline';
    document.getElementById("taCodigoFonte").innerHTML="Dados recebidos com sucesso!!\nClick nos botões para criar"
}

        function gerarModel() {
            let codigoFonte="";

            codigoFonte = "class " + NomeClasse + "{" + "\n";

            codigoFonte += "   constructor (" + VetorAtributo.join(",") + ")" + "{\n";

            for (let i = 0; i < VetorAtributo.length; i++) {
                const at = VetorAtributo[i];
                codigoFonte += "          this." + at + " = " + at + ";\n";
            }
            codigoFonte += "          this.posicaoNaLista = null;\n"
            codigoFonte += "   }\n}\n";

            document.getElementById("taCodigoFonte").innerHTML = codigoFonte;
        }

        function gerarView() {
            let codigoFonte = "";
            codigoFonte = "<!DOCTYPE html>\n" +
                "<html lang=\"en\">\n" +
                "\n" +
                "<head>\n" +
                "    <meta charset=\"UTF-8\">\n" +
                "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
                "    <title>CRUD " + NomeClasse + "</title>\n" +
                "</head>\n" +
                "\n" +
                "<body>\n\n"+
                "<h1>Cadastro de "+NomeClasse+"</h1>\n\n"+
                '<label for="input'+VetorAtributo[0]+'"'+">"+VetorAtributo[0]+"</label>\n"+
                '<input type="'+VetorTipo[0]+'" '+'name="input'+VetorAtributo[0]+'" '+ 'id="input'+VetorAtributo[0]+'">\n'+
                '<input type="button" value="Procure" id="btProcure" onclick="procure()" style="display:inline;">\n'+
                '<input type="button" value="Inserir" id="btInserir" onclick="inserir()" style="display:none;">\n'+
                '<input type="button" value="Alterar" id="btAlterar" onclick="alterar()" style="display:none;">\n'+
                '<input type="button" value="Excluir" id="btExcluir" onclick="excluir()" style="display:none;">\n<br><br>\n\n';

                for (let i = 1; i < VetorAtributo.length; i++) {
                    codigoFonte+= '<label for="input'+VetorAtributo[i]+'"'+">"+VetorAtributo[i]+"</label>\n"+
                '<input type="'+VetorTipo[i]+'" '+'name="input'+VetorAtributo[i]+'" '+ 'id="input'+VetorAtributo[i]+'"><br>\n'
                }

                codigoFonte+='<div id="divAviso" style="background-color: antiquewhite;"></div>\n<br>\n'+
                '<input type="button" value="Salvar" id="btSalvar" onclick="salvar()" style="display:none;">\n'+
                '<input type="button" value="Cancelar" id="btCancelar" onclick="cancelarOperacao()" style="display:none;">\n<br><br>\n'+
                '<div id="outputSaida" style="background-color: aqua;">...</div>\n\n'+
                '<input type="button" value="Persistir" id="btPersisitir" onclick="prepararESalvarCSV()">\n'+
                '<input type="button" value="Recuperar" id="btRecuperar" onclick="abrirArquivoSalvoEmLocalPermanente()">\n'+
                '<script src="./'+NomeClasse+'.js"></script>\n'+
                '<script src="./'+NomeClasse+'Control.js"></script>\n\n'+
                '</body>\n\n'+
                '</html>';
                
                

            document.getElementById("taCodigoFonte").innerHTML= codigoFonte;
        }
          function gerarController() {
            let codigoFonte ="";
            let nomeVariavel=NomeClasse.toLowerCase();
            codigoFonte +='let lista'+NomeClasse+'= [];\n'+
            "let oQueEstaFazendo = '';\n"+
            'let '+nomeVariavel+'= null;\n'+
            'bloquearAtributos(true);\n'+
            'function procurePorChavePrimaria(chave) {\n'+
            '   for (let i = 0; i < lista'+NomeClasse+'.length; i++) {\n'+
            '   const '+nomeVariavel+' = lista'+NomeClasse+'[i];\n\n'+
            '   if ('+nomeVariavel+'.'+VetorAtributo[0]+'== chave) {\n\n'+
                nomeVariavel+'.posicaoNaLista = i;\n\n'+
            '   return lista'+NomeClasse+'[i];\n'+
            '  }\n'+
            '  }\n'+
            '  return null;\n'+
            '  }\n\n'+
            'function procure() {\n'+
            '  const '+VetorAtributo[0]+' = document.getElementById("input'+VetorAtributo[0]+'").value;\n\n'+
            '  if (isNaN('+VetorAtributo[0]+') || !Number.isInteger(Number('+VetorAtributo[0]+'))) {\n\n'+
            '  mostrarAviso("Precisa ser um número inteiro");\n'+
            '  document.getElementById("input'+VetorAtributo[0]+'").focus();\n'+
            '  return;\n'+
            '  }\n\n'+
            '  if('+VetorAtributo[0]+') {\n'+
            nomeVariavel+' = procurePorChavePrimaria('+VetorAtributo[0]+')\n\n'+
            '  if ('+nomeVariavel+') {\n'+
            '    mostrarDados'+NomeClasse+'('+nomeVariavel+')\n'+
            "    visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none');\n"+
            '    mostrarAviso("Achou na lista, pode alterar ou excluir");\n'+
            '    } else {\n'+
            '    limparAtributos();\n'+
            "    visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');\n"+
            '    mostrarAviso("Não achou na lista, pode inserir");\n'+
            '    }\n'+
            '    } else {\n'+
            '    document.getElementById("input'+VetorAtributo[0]+'").focus();\n'+
            '    return;\n'+
            '   }\n'+
            '   }\n\n'+
            'function inserir() {\n\n'+
            'bloquearAtributos(false);\n'+
            "visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n"+
            "oQueEstaFazendo = 'inserindo';\n"+
            'mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");\n'+
            'document.getElementById("input'+VetorAtributo[0]+'").focus();\n\n'+
            '}\n\n'+
            'function alterar() {\n\n'+
            '   bloquearAtributos(false);\n\n'+
            "   visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n"+
            "   oQueEstaFazendo = 'alterando';\n"+
            '   mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");\n'+
            '}\n\n'+
            'function excluir() {\n'+
            '  bloquearAtributos(false);\n\n'+
            "  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');\n\n"+
            "  oQueEstaFazendo = 'excluindo';\n"+
            '  mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");\n'+
            '}\n\n'+
            'function salvar() {\n'+
            '  let '+VetorAtributo[0]+';\n'+
            '  if ('+nomeVariavel+' == null){\n'+
            VetorAtributo[0]+' =  parseInt(document.getElementById("input'+VetorAtributo[0]+'").value);\n'+
            '  } else {\n'+
            VetorAtributo[0]+' = '+nomeVariavel+'.'+VetorAtributo[0]+';\n'+
            '  }\n\n';

            for (let i = 1; i < VetorAtributo.length; i++) {
              if (VetorTipo[i]=='number') {
                codigoFonte+= 'const '+ VetorAtributo[i]+'= parseInt(document.getElementById("input'+VetorAtributo[i]+'").value);\n';
              }else if(VetorTipo[i]=='checkbox'){
                codigoFonte+='const '+ VetorAtributo[i]+'= (document.getElementById("input'+VetorAtributo[i]+'").checked) ? "sim" : "Não";\n';
              }else if (VetorTipo[i]=='date'){
                 codigoFonte+='const '+ VetorAtributo[i]+'= Formatardata(document.getElementById("input'+VetorAtributo[i]+'").value);\n';
              }else{
                codigoFonte+='const '+ VetorAtributo[i]+'= document.getElementById("input'+VetorAtributo[i]+'").value;\n';
              }
            }
            
            codigoFonte+='  if('+VetorAtributo.join(" && ")+') {\n'+
            '    switch (oQueEstaFazendo) {\n'+
            "    case 'inserindo':\n"+
            nomeVariavel+' = new '+NomeClasse+'('+VetorAtributo.join(",")+');\n'+
            'lista'+NomeClasse+".push("+nomeVariavel+");\n"+
            'mostrarAviso("Inserido na lista");\n'+
            'break;\n'+
            "case 'alterando':\nlet "+
            nomeVariavel+'Alterado = new '+ NomeClasse+'('+VetorAtributo.join(",")+');\n'+
            'lista'+NomeClasse+"["+nomeVariavel+'.posicaoNaLista] = '+nomeVariavel+'Alterado;\n'+
            'mostrarAviso("Alterado");\nbreak;\n'+
            "case 'excluindo':\n"+
            '  let novaLista = [];\n\n'+
            'for (let i = 0; i < lista'+NomeClasse+'.length; i++) {\n\n'+
            '   if('+nomeVariavel+'.posicaoNaLista != i) {\n'+
            '   novaLista.push(lista'+NomeClasse+'[i]);\n}\n}\n'+
            'lista'+NomeClasse+' = novaLista;\n'+
            'mostrarAviso("EXCLUIDO");\nbreak;\ndefault:\n\nmostrarAviso("Erro aleatório");\n}\n'+
            "visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\nlimparAtributos();\nlistar();\n"+
            'document.getElementById("input'+VetorAtributo[0]+'").focus();\n } else {\n alert("Erro nos dados digitados");\nreturn;\n}\n}\n'+
            'function preparaListagem(vetor) {\nlet texto = "";\nfor (let i = 0; i < vetor.length; i++) {\n const linha = vetor[i];\ntexto += \n';

            for (let i = 0; i < VetorAtributo.length; i++) {
              if (i==VetorAtributo.length-1) {
                codigoFonte+='linha.'+VetorAtributo[i]+'+" <br> ";\n}\nreturn texto;\n}\n\n';
              }else{
                codigoFonte+='linha.'+VetorAtributo[i]+'+" - "+\n';
              }
            }
            codigoFonte+='function listar() {\n document.getElementById("outputSaida").innerHTML = preparaListagem(lista'+NomeClasse+');\n}'+'function cancelarOperacao() {\n'+
            " limparAtributos();\nbloquearAtributos(true);\nvisibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');\n"+
            'mostrarAviso("Cancelou a operação de edição");\n}\n\n'+
            'function mostrarAviso(mensagem) {\n'+
            ' document.getElementById("divAviso").innerHTML = mensagem;\n}\n\n'+'function mostrarDados'+NomeClasse+'('+nomeVariavel+'){\n';

            for (let i = 0; i < VetorAtributo.length; i++) {
              codigoFonte+='document.getElementById("input'+VetorAtributo[i]+'").value = '+nomeVariavel+'.'+VetorAtributo[i]+';\n';
            }
            codigoFonte+=' bloquearAtributos(true);\n}'+
            'function limparAtributos() {\n';
            for (let i = 1; i < VetorAtributo.length; i++) {
              if (VetorTipo[i]=="checkbox") {
                codigoFonte+='document.getElementById("input'+VetorAtributo[i]+'").checked = false;\n';
              }else {
              codigoFonte+='document.getElementById("input'+VetorAtributo[i]+'").value = "";\n';
            }
          }
            codigoFonte+='bloquearAtributos(true);\n}\nfunction bloquearAtributos(soLeitura) {\n';
            for (let i = 0; i < VetorAtributo.length; i++) {
               if (i==0) {
                codigoFonte+='document.getElementById("input'+VetorAtributo[i]+'").readOnly = !soLeitura;\n';
               } else {
                codigoFonte+='document.getElementById("input'+VetorAtributo[i]+'").readOnly = soLeitura;\n';
               }
              
            }

            codigoFonte+='}\n\nfunction visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {\ndocument.getElementById("btProcure").style.display = btProcure;\ndocument.getElementById("btInserir").style.display = btInserir;\ndocument.getElementById("btAlterar").style.display = btAlterar;\ndocument.getElementById("btExcluir").style.display = btExcluir;\ndocument.getElementById("btSalvar").style.display = btSalvar;\ndocument.getElementById("btCancelar").style.display = btSalvar;\ndocument.getElementById("input'+VetorAtributo[0]+'").focus();\n}\n\nfunction persistirEmLocalPermanente(arquivoDestino, conteudo) {\n'+"const blob = new Blob([conteudo], { type: 'text/plain' });\n const link = document.createElement('a');\n link.href = URL.createObjectURL(blob);\n link.download = arquivoDestino;\nlink.click(); \n URL.revokeObjectURL(link.href);\n}\n\nfunction abrirArquivoSalvoEmLocalPermanente() {\nconst input = document.createElement('input');\n input.type = 'file';\n input.accept = '.csv';\ninput.onchange = function (event) {\nconst arquivo = event.target.files[0];\nconsole.log(arquivo.name);\n if (arquivo) {\n  converterDeCSVparaListaObjeto(arquivo);\n}\n};\ninput.click();\n}\n\nfunction prepararESalvarCSV() {\n"+'  let nomeDoArquivoDestino = "./'+NomeClasse+'.csv";\nlet textoCSV = "";\nfor (let i = 0; i < lista'+NomeClasse+'.length; i++) {\nconst linha = lista'+NomeClasse+'[i];\n'+
            'textoCSV += ';
            for (let i = 0; i < VetorAtributo.length; i++) {
              if (i==VetorAtributo.length-1) {
                codigoFonte+='linha.'+VetorAtributo[i]+'+"\\n";\n';
              }else{
                codigoFonte+='linha.'+VetorAtributo[i]+'+";"+\n';
              }
            }
            codigoFonte+='}\n persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);\n}\nfunction converterDeCSVparaListaObjeto(arquivo) {\n const leitor = new FileReader();\nleitor.onload = function (e) {\n    const conteudo = e.target.result;\n'+"  const linhas = conteudo.split('\\n');\n lista"+NomeClasse+' =[];\n for (let i = 0; i < linhas.length; i++) {\nconst linha = linhas[i].trim();\n if (linha) {\n'+"const dados = linha.split(';');\n if (dados.length ==="+VetorAtributo.length+') {\n'+
            'lista'+NomeClasse+'.push({\n';

            for (let i = 0; i < VetorAtributo.length; i++) {
              if (i==VetorAtributo.length-1) {
                codigoFonte+= VetorAtributo[i]+': dados['+i+']\n});\n}\n}\n}\n listar();\n};\nleitor.readAsText(arquivo);\n}\n'
              } else {
                codigoFonte+= VetorAtributo[i]+': dados['+i+'],\n'
              }
           }
            debugger
          for (let i = 0; i < VetorTipo.length; i++) {
            if(VetorTipo[i]=='date'){
              codigoFonte+="function Formatardata(dataISO){\n"+
            "const partes = dataISO.split('-');\n"+ 
            "const ano = partes[0];\n"+
            "const mes = partes[1];\n"+
            "const dia = partes[2];\n"+
            "return `${dia}/${mes}/${ano}`;\n"+
        '}';
            }
            
          }
          document.getElementById("taCodigoFonte").textContent = codigoFonte;
        }
