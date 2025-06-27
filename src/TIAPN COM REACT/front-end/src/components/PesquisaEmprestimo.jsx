import Axios from 'axios'
import {useEffect, useState, useRef} from 'react'
import {useNavigate} from "react-router-dom"
import ReactDOM from 'react-dom'
import { BsCircleFill, BsXLg, BsSearch } from "react-icons/bs";
import { deleteEmprestimo, getEmprestimoFuncionario } from '../services/api';

function PesquisaEmprestimo(){

    const navigate = useNavigate()
    const [dados, setDados] = useState([]);
    const [nome, setNome] = useState("")
    const [peca, setPeca] = useState("vazio")
    const [departamento, setDepartamento] = useState("vazio")
    let emprestimoRef = useRef('');
    let buttonRef = useRef('')
    let aux = ""

    const fetchEmprestimos = async () => {
        
        try{
              
            const data = await getEmprestimoFuncionario();
            setDados(data);
        
        }catch(err){
        
            console.log(err);
        }
    }

    useEffect(() => {

        fetchEmprestimos();

    }, [dados])

    function Pesquisar(){
        
        let testes = document.getElementsByClassName("emprestimo")

        for (let i = 0; i < dados.length; i++) {

            let nome_Func = (dados[i].Nome).toLowerCase()
            let cod_Pec = dados[i].Codigo_Ferramenta + ""
            let nome_Dep = (dados[i].nome).toLowerCase()

            if (nome_Func.includes(nome.toLowerCase()) && peca == "vazio" && departamento == "vazio") {
                       
                testes[i].style.display = "flex"
                
            }else if(nome_Func.includes(nome.toLowerCase()) && cod_Pec.includes(peca) && departamento == "vazio"){
                   
                testes[i].style.display = "flex"


            }else if(nome_Func.includes(nome.toLowerCase()) && nome_Dep.includes(departamento.toLowerCase()) && peca == "vazio"){
                    
                testes[i].style.display = "flex"

            }else if(nome_Func.includes(nome.toLowerCase()) && cod_Pec.includes(peca) && nome_Dep.includes(departamento.toLowerCase())){

                testes[i].style.display = "flex"

            }else{

                testes[i].style.display = "none"
            }
        }
    }

    async function excluiEmprestimo(id){

        console.log(id)
        try{

            const res = await deleteEmprestimo( id);

        }catch(er){
            
            console.log(er);
        }

        const newEmprestimo = dados.filter(teste => dados.Codigo != id)

        setDados(newEmprestimo)
    }

    return (

        <main>
            <article>

                <h1>Lista de Empréstimo</h1>

                <div className="divider"></div>

                <div className="container">

                    <div id="filtragem">
                    
                        <div className="input-icons">

                            <i>
                                <BsSearch />
                            </i>
                            <input type="text" name="nome" id="inputNome" placeholder="Nome" onChange={(event) => {setNome(event.target.value)}}/>

                        </div>

                        <select name="selectPeca" id="selectPeca" onChange={(event) => {setPeca(event.target.value)}}>

                            <option value="vazio" selected>Peca</option>
                        
                            {dados.map((opcao) => (

                                <option value={opcao.Codigo_Ferramenta}>{opcao.Codigo_Ferramenta}</option>
                            ))}

                        </select>

                        <select name="selectDepartamento" id="selectDepartamento" onChange={(event) => {setDepartamento(event.target.value)}}>

                            <option value="vazio" selected>Departamento</option>

                             {dados.map((opcao) => (

                                <option value={opcao.nome}>{opcao.nome}</option>
                            ))}
                
                        </select>

                        <button onClick={() => Pesquisar()}>Pesquisar</button>

                        <a onClick={() => navigate(-1)} style={{color:'black'}}>
                            <i>
                                <BsXLg />
                            </i>
                        </a>

                    </div>

                    <div className="divider"></div>

                    <div id="listaEmprestimos" className="container2" ref={emprestimoRef}>

                        {dados.map((opcao) => (

                            <div className="emprestimo container3" id={opcao.Codigo}>

                                <div id="grupo1">

                                    <div>
                                        <p className="label">Nome</p>
                                        <p className="text nomes">{opcao.Nome}</p>
                                    </div>

                                    <div>
                                        <p className="label">Data de Empréstimo</p>
                                        <p style={{display: 'none'}}>{aux = opcao.Data_Retirada.split("-")}</p>
                                        <p className="text">{aux[2] + "/" + aux[1] + "/" + aux[0]}</p>
                                    </div>

                                </div>
                                
                                <div id="grupo2">

                                    <div>
                                        <p className="label">Departamento</p> 
                                        <p className="text departamentos">{opcao.nome}</p>
                                    </div>
                                
                                    <div>
                                        <p className="label">Ferramenta</p>
                                        <p className="text ferramentaCod">{opcao.Codigo_Ferramenta}</p>
                                    </div>              
                                </div>

                                <div id="grupo3">

                                    <div>          
                                        <p className="label">Data de Devolução <BsCircleFill /></p>

                                        <p style={{display: 'none'}}>{aux = opcao.Data_Devolucao.split("-")}</p>
                                        <p className="text">{aux[2] + "/" + aux[1] + "/" + aux[0]}</p>
                                    </div>

                                    <button onClick={() => excluiEmprestimo(opcao.Codigo)}type="submit">Devolver</button>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </article>   
        </main>
    )
}

export default PesquisaEmprestimo