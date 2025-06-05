let lista_emprestimo = document.getElementById("lista_emprestimo")

window.onload = () =>{
  
  fetch('http://localhost:3000/EmprestimoAtrasado')
  .then(response => response.json())
  .then(dados => {

    db = dados;
    console.log(db)
    lista_emprestimos()
  })
}

function lista_emprestimos() {
    
    let str = "";

    if(db.length <= 2)
        TAM = db.length
    else 
        TAM = 1

    for (let i = 0; i < TAM; i++) {
        
        let aux = db[i].Data_Devolucao.split("-");
        let data = aux[2] + "/" + aux[1] + "/" + aux[0];
        
        str+= ` <div class="emprestimo container3" id="{db[i].Codigo}">

                    <div id="grupo1">

                        <div>
                            <p class="label">Nome</p>
                            <p class="text nomes">${db[i].Nome}</p>
                        </div>

                    </div>
              
                    <div id="grupo2">

                        <div>
                            <p class="label">Ferramenta</p>
                            <p class="text">${db[i].nome}</p>
                        </div>  
                        
                        <div>
                            <p class="label">Codigo</p>
                            <p class="text ferramentaCod">${db[i].Codigo_Ferramenta}</p>
                        </div>
                        
                        <div>      
                            <p class="label">Data de Devolução</p>
                            <p class="text">${data}</p>
                        </div>
                    </div>
                </div>`   
    }

    str += `<a href="Lista_Emprestimo.html"><button>Todos</button></a>`;

    lista_emprestimo.innerHTML = str;
}