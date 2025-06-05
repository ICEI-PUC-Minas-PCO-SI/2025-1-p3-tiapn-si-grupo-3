const menuButton = document.querySelector('.menu-button');
const sidebar = document.querySelector('.sidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

let listaEmprestimos = document.getElementById("listaEmprestimos");
let listaOptions = document.getElementById("selectPeca");
let listaOptions2 = document.getElementById("selectDepartamento");
let db;

window.onload = () =>{
  
  fetch('http://localhost:3000/emprestimofuncionario')
  .then(response => response.json())
  .then(dados => {

    db = dados;
    console.log(db)
    imprimeEmprestimos();  
  })
}

const pesquisar = () => {
    
    let inputNome = document.getElementById("inputNome").value;
    inputNome = inputNome.toLowerCase();

    let selectPeca = document.getElementById("selectPeca").value;
    let selectDepartamento = document.getElementById("selectDepartamento").value

    let emprestimo = document.getElementsByClassName("emprestimo")
    let nomes = document.getElementsByClassName("nomes");
    let ferramentaCod = document.getElementsByClassName("ferramentaCod");
    let departamentos = document.getElementsByClassName("departamentos");

    for (let i = 0; i < nomes.length; i++) {
        

        if (nomes[i].innerHTML.toLowerCase().includes(inputNome) && selectPeca == "vazio" && selectDepartamento == "vazio") {
            
            emprestimo[i].style.display = "flex"

        }else if(nomes[i].innerHTML.toLowerCase().includes(inputNome) && ferramentaCod[i].innerHTML.toLowerCase().includes(selectPeca) && selectDepartamento == "vazio"){
            
            emprestimo[i].style.display = "flex"

        }else if(nomes[i].innerHTML.toLowerCase().includes(inputNome) && departamentos[i].innerHTML.includes(selectDepartamento) && selectPeca == "vazio"){
            
            emprestimo[i].style.display = "flex"

        }else if(nomes[i].innerHTML.toLowerCase().includes(inputNome) && ferramentaCod[i].innerHTML.toLowerCase().includes(selectPeca) && departamentos[i].innerHTML.includes(selectDepartamento)){

            emprestimo[i].style.display = "flex"

        }else{

            emprestimo[i].style.display = "none";
        }
    }

}

function imprimeEmprestimos() {
    
    let str = '';
    let str2 = '<option selected value="vazio">Código da Peça</option>';
    let str3 = '<option selected value="vazio">Departamento</option>';

    for(let i = 0 ; i < db.length ; i++){

      str2 += `<option value="${db[i].Codigo_Ferramenta}">${db[i].Codigo_Ferramenta}</option>`;

      str3 += `<option value="${db[i].nome}">${db[i].nome}</option>`
        
      let aux = db[i].Data_Retirada.split("-");
      let data = `${aux2[2]}/${aux2[1]}/${aux2[0]}`

      let aux3 = db[i].Data_Devolucao.split("-");
      let data2 = `${aux3[2]}/${aux3[1]}/${aux3[0]}`

      str += `<div class="emprestimo container3" id="${db[i].Codigo}">

              <div id="grupo1">

                <div>
                  <p class="label">Nome</p>
                  <p class="text nomes">${db[i].Nome}</p>
                </div>

                <div>
                  <p class="label">Data de Empréstimo</p>
                  <p class="text">${data}</p>
                </div>

              </div>
              
              <div id="grupo2">

                <div>
                  <p class="label">Departamento</p> 
                  <p class="text departamentos">${db[i].nome}</p>
                </div>

                <div>
                  <p class="label">Ferramenta</p>
                  <p class="text ferramentaCod">${db[i].Codigo_Ferramenta}</p>
                </div>              
              </div>

              <div id="grupo3">

                <div>
                  
                  <p class="label">Data de Devolução <i class="material-icons icon_circle">brightness_1</i></p>
                  
                  <p class="text">${data2}</p>
                </div>

                <button type="submit" onClick="javarscipt:excluiEmprestimo(${db[i].Codigo});recarregarAPagina()">Devolver</button>

              </div>
            </div>`
    }

    listaEmprestimos.innerHTML = str;
    listaOptions.innerHTML = str2;
    listaOptions2.innerHTML = str3;
}

function recarregarAPagina(){


  window.location.reload();
  console.log("eede")
} 

function excluiEmprestimo(id){

  console.log(id);

  let url = 'http://localhost:3000/emprestimo/delete/:' + id;

  let options = {

    method: "DELETE",
  }

  fetch(url, options)
  .then(response => console.log(response.status))
}