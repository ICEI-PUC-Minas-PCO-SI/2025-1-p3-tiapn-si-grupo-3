import Axios from 'axios'
import { BsCalendar3 } from "react-icons/bs";
import {useEffect, useState, useRef} from 'react'
import { getFerramentas, getFuncionarios, getEmprestimo, postEmprestimo } from '../services/api'
function Forms(){

  const [codFunc, setCodFunc] = useState([]);
  const [codFerr, setCodFerr] = useState([]);
  const [emprestimos, setEmprestimos] = useState([])

  const [selectFerr, setSelectFerr] = useState("ferramenta")
  const [selectFunc, setSelectFunc] = useState("funcionario")
  const [quantidade, setQuantidade] = useState("")
  const [dataEm, setData] = useState("")
  const [descricao, setDescricao] = useState("")

  const fetchDados = async () => {
      
    try{
            
      const data = await getFerramentas();
      setCodFerr(data)

      const data2 = await getFuncionarios();
      setCodFunc(data2)

      const data3 = await getEmprestimo();
      setEmprestimos(data3)
      
    }catch(err){
      
      console.log(err);
    }
  }

  useEffect(() =>{

    fetchDados();

  },[emprestimos])

  async function criaEmprestimo() {

    const date = new Date();
    let ano = date.getFullYear();
    let dia = date.getDate();
    let mes = date.getMonth() + 1;

    if(dia < 10 )
        dia = "0" + dia

    if(mes < 10)
        mes = "0" + mes 
    
    let data = {
        
      codigo_func: selectFunc,
      codigo_ferr: selectFerr,
      quantidade: quantidade,
      data_dev: dataEm,
      data_ret: ano + "-" + mes + "-" + dia,
      desc:descricao,
    }

    let res
    
    try{

      
      setQuantidade('')
      setData('')
      setDescricao('')

      res = await postEmprestimo(data);

      const updated = await res.json();
      
      setEmprestimos((prev) => [...prev, updated]);
    
    }catch(er){
    
      console.log(er);
    }
}

  return (

    <main>        
      <article>

        <h1>Gerar Novo Empréstimo</h1>

        <div className="divider"></div>

        <div className="container">

          <div className="container2">
        
            <div className="container4">

              <div className="grupo2">

                <div id="grupo2-sub1">
                  <p>Código Funcionário:</p>

                  <select name="selectCodFunc" id="selectFuncionario" value={selectFunc} onChange={(event) => setSelectFunc(event.target.value)}>

                    {codFunc.map((codigo) => (

                      <option value={codigo.Codigo}>{codigo.Codigo}</option>
                    ))}
                                      
                  </select>
                </div>

                <div id="grupo2-sub2">
                  <p>Código Da Ferramenta</p>
                  <select name="selectCodFerr" id="selectFerramenta" value={selectFerr} onChange={(event) => setSelectFerr(event.target.value)}>
                            
                    {codFerr.map((codigo) => (

                      <option value={codigo.Codigo}>{codigo.Codigo}</option>
                    ))}
                  </select>
                </div>
                    
              </div>

              <div className="grupo2">

                <div id="grupo2-sub1" className="corrigeEspc" style={{marginRight: 70 + 'px'}}>

                  <p>Quantida de Empréstimo</p>

                  <input type="text" 
                  value={quantidade} 
                  onChange={(event) => setQuantidade(event.target.value)}
                  id="inputQuantidade" placeholder="Insria a quantidade" className='teste'></input>

                </div>

                <div id="grupo2-sub2">
                        
                  <p>Data para Devolução</p>

                  <div className="input-icons">
                    <i><BsCalendar3/></i>
                    <input type="text" id="inputData" placeholder="AAAA-MM-DD" value={dataEm} onChange={(event) => setData(event.target.value)} style={{textIndent: 40 + 'px'}}/>
                  </div>   

                </div>                
              </div>

              <div className="grupo2" >

                <div id="grupo2-sub1" style={{marginRight: 60 + 'px'}}>

                  <p>Descrição</p>
                  <input className='inputDescricao' type="text" value={descricao}
                  onChange={(event) => setDescricao(event.target.value)} id="inputDescricao" placeholder="Insria a descricao"/>

                </div>
                  
                <button className="btn-forms" onClick={()=> criaEmprestimo()}>Emprestar</button>
              </div>
            </div>

            <div id="erro" className="container5" style={{display:'none'}}>

              <h1>Error: Funcionario bloqueado para o emprestimo</h1>

              <p>Alguns possiveis motivos: Setor não tem autorização para emprestimo da ferramenta especifica, funcionario penalizado etc</p>

              <div className="button-icons">

                <i id="icon_error_outline" className="material-icons">error_outline</i>

                <button>Emprestar mesmo assim</button>
              </div>   
            </div>
          </div>
        </div>
      </article>
    </main>
  )
}

export default Forms