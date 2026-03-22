let ListaAlunos=[];
function inserir() {
    let RA= document.getElementById("inputRA").value;
    let nome=document.getElementById("inputNome").value;
    let curso=document.getElementById("inputCurso").value;

    let NovoAluno=new Aluno(RA,nome,curso);
    ListaAlunos.push(NovoAluno);
    
    Lista();
   
    document.getElementById("inputRA").value = "";
    document.getElementById("inputNome").value = "";
    document.getElementById("inputCurso").value = "";
    
}

function Lista() {
    let resp="";
    for (let i = 0; i < ListaAlunos.length; i++) {
        let p= ListaAlunos[i];
        resp+=p.nome+" - "+p.curso+"<br>"
    }
    document.getElementById("outputlista").innerHTML=resp;
}

function procurarRA() {
    let RAproc=document.getElementById("RAproc").value;
    let EstaNaLista= false;
    let resp="";
    
    for (let i = 0; i < ListaAlunos.length; i++) {
        r=ListaAlunos[i];
        if (RAproc==r.RA) {
            resp=ListaRA(i);
            EstaNaLista=true;
        }
    }

    if (EstaNaLista) {
        document.getElementById("outputlista").innerHTML=resp;
    }else{
        alert("Nenhum aluno encontrado")
    }   
}

function ListaRA(i) {
    let resp="";
    let p= ListaAlunos[i];
    resp+=p.RA+" - "+p.nome+" - "+p.curso+"<br>"
    return resp;
}

function procurarcurso() {
    let cursoproc=document.getElementById("cursoproc").value;
    let resp="";
    let EstaNaLista= false;
    for (let i = 0; i < ListaAlunos.length; i++) {
        r=ListaAlunos[i];
        if (cursoproc==r.curso) {
            resp=Listacurso(i);
            EstaNaLista=true;
        }
    }

    if (EstaNaLista) {
        document.getElementById("outputlista").innerHTML=resp;
    }else{
        alert("Nenhum aluno encontrado")
    }   
}


function Listacurso(i) {
    let resp="";
    let p= ListaAlunos[i];
    resp+=p.nome+"<br>"
    return resp;
}




