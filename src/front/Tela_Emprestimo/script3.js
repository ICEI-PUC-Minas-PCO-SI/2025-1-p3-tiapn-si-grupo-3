let erro = document.getElementById("erro");
let selectFunc = document.getElementById("selectFuncionario");
let selecFerr = document.getElementById("selectFerramenta");
let db, db2;

erro.style.display = "none";

window.onload = () =>{
  
    fetch('http://localhost:3000/operario')
    .then(response => response.json())
    .then(dados => {

        db = dados;
        
        fetch('http://localhost:3000/ferramenta')
        .then(response => response.json())
        .then(dados => {

            db2 = dados;

            fetch('http://localhost:3000/emprestimo')
            .then(response => response.json())
            .then(dados => {

                db3 = dados

                imprimeSelections()
            })
        })
    })
}

function imprimeSelections(){

    let str = `<option selected value="vazio">Código</option>`;
    let str2 = str;

    for(let i = 0 ; i < db.length ; i++){

        str += `<option value="${db[i].Funcionario_Codigo}">${db[i].Funcionario_Codigo}</option>`;
    }

    for(let i = 0 ; i < db2.length ; i++){

        str2 += `<option value="${db2[i].Codigo}">${db2[i].Codigo}</option>`;
    }

    selectFunc.innerHTML = str;
    selecFerr.innerHTML = str2;
}

function criaEmprestimo() {
    
    //let inputNome = document.getElementById("inputNome").value;
    let inputQt = document.getElementById("inputQuantidade").value;
    let inputData = document.getElementById("inputData").value;
    let inputDesc = document.getElementById("inputDescricao").value

    const date = new Date();
    let ano = date.getFullYear();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;

    if(dia < 10 )
        dia = "0" + dia

    if(mes < 10)
        mes = "0" + mes

    console.log(db3.length + 1); 

    let data = {

        
        codigo_func: selectFunc.value,
        codigo_ferr: selecFerr.value,
        quantidade: inputQt,
        data_dev: inputData,
        data_ret: ano + "-" + mes + "-" + dia,
        desc:inputDesc,
        codigo_emp: db3.length +1
    }

    fetch('http://localhost:3000/Emprestimo',{

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify(data)
    })
    .then(response => console.log(response.status))
}