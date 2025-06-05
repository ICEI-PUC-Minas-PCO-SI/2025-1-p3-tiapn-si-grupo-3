const express = require('express');
const router = express.Router();
const db = require('../db/db'); // certifique-se de que esse arquivo exporta sua conexão com o MySQL

// Função genérica para criar rotas GET de cada tabela
function criarRotaParaTabela(nomeTabela) {
  router.get(`/${nomeTabela}`, async (req, res) => {

    try {
      const [rows] = await db.query(`SELECT * FROM ${nomeTabela}`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
    }
  });
}

function EmprestimoFuncionario(){

    router.get(`/EmprestimoFuncionario`, async (req, res) => {

    try {

      const [rows] = await db.query(`SELECT Funcionario.Nome, Departamento.nome, Emprestimo.Data_Retirada, Emprestimo.Data_Devolucao, Emprestimo_Ferramenta.Codigo_Ferramenta, Emprestimo.Codigo FROM Funcionario inner join Emprestimo on Funcionario.Codigo = Emprestimo.Operario_Funcionario_Codigo inner join Departamento on Funcionario.Departamento_Codigo = Departamento.Codigo inner join Emprestimo_Ferramenta on Emprestimo.Codigo = Emprestimo_Ferramenta.Emprestimo_Codigo`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
  });
}

function deletaEmprestimo (){

  router.delete(`/emprestimo/delete/:id`, async (req, res) =>{

    let aux  = req.params.id.split(":");

    let id = aux[1]

    try {

      const [rows] = await db.query(`DELETE FROM Emprestimo WHERE codigo = ${id}`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
  })
}

function insereEmprestimo(){
  
  router.post('/Emprestimo', async (req, res) => {
  
    console.log(req.body)
    
    let nome = req.body.nome;
    let codigo_func = req.body.codigo_func;
    let codigo_ferr = req.body.codigo_ferr;
    let quantidade = req.body.quantidade;
    let data_dev = req.body.data_dev;
    let data_ret = req.body.data_ret;
    let desc = req.body.desc;
    let codigo_emp = req.body.codigo_emp;

    try {
    
      const [result] = await db.query(`INSERT INTO Emprestimo (Codigo, Descricao, Data_Retirada, Data_Devolucao, Operario_Funcionario_Codigo) VALUES (?,?,?,?,?)`,[codigo_emp,desc,data_ret,data_dev,codigo_func]);
    

    } catch (err) {
      console.error("Erro ao inserir ferramenta:", err);
      res.status(500).json({ error: 'Erro ao cadastrar a ferramenta.' });
    }
  });
}

// Lista de tabelas
const tabelas = [
  'Departamento',
  'Funcionario',
  'Administrador',
  'Operario',
  'Evento',
  'Lembrete',
  'Compra',
  'Material',
  'Compra_Material',
  'Ferramenta',
  'Emprestimo',
  'Emprestimo_Ferramenta'
];

// Cria as rotas automaticamente
tabelas.forEach(criarRotaParaTabela);

EmprestimoFuncionario();
deletaEmprestimo();
insereEmprestimo()

router.post('/Ferramenta', async (req, res) => {
  // Extrai os dados do corpo da requisição
  const { nome, tipo, quantidade, localizacao } = req.body;

  // Validação simples
  if (!nome || !tipo || !quantidade || !localizacao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'INSERT INTO Ferramenta (Nome, Tipo, Quantidade, Localizacao) VALUES (?, ?, ?, ?)';
    // No seu schema do DB, o nome da coluna é 'Localização'? Se for, ajuste abaixo.
    // Estou assumindo que seja 'Localizacao' sem o 'ç' e 'ã' para compatibilidade.
    const [result] = await db.query(query, [nome, tipo, quantidade, localizacao]);
    
    // Retorna o novo item criado com seu ID
    res.status(201).json({ 
        id: result.insertId, 
        nome, 
        tipo, 
        quantidade, 
        localizacao 
    });

  } catch (err) {
    console.error("Erro ao inserir ferramenta:", err);
    res.status(500).json({ error: 'Erro ao cadastrar a ferramenta.' });
  }
});


// ROTA PARA ATUALIZAR (PUT) UMA FERRAMENTA EXISTENTE
router.put('/Ferramenta/:id', async (req, res) => {
  const { id } = req.params; // Pega o ID da URL
  const { nome, tipo, quantidade, localizacao } = req.body;

  // Validação
  if (!nome || !tipo || !quantidade || !localizacao) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const query = 'UPDATE Ferramenta SET Nome = ?, Tipo = ?, Quantidade = ?, Localizacao = ? WHERE Codigo = ?';
    const [result] = await db.query(query, [nome, tipo, quantidade, localizacao, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ferramenta não encontrada.' });
    }
    
    res.json({ message: 'Ferramenta atualizada com sucesso.' });

  } catch (err) {
    console.error("Erro ao atualizar ferramenta:", err);
    res.status(500).json({ error: 'Erro ao atualizar a ferramenta.' });
  }
});


// (Opcional) ROTA PARA DELETAR (DELETE) UMA FERRAMENTA
router.delete('/Ferramenta/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const query = 'DELETE FROM Ferramenta WHERE Codigo = ?';
    const [result] = await db.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Ferramenta não encontrada.' });
    }

    res.status(200).json({ message: 'Ferramenta deletada com sucesso.' });

  } catch (err) {
    console.error("Erro ao deletar ferramenta:", err);
    res.status(500).json({ error: 'Erro ao deletar a ferramenta.' });
  }
});

module.exports = router;
