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
    console.log("ssss" + id)

    try {

      const [rows] = await db.query(`DELETE FROM Emprestimo WHERE codigo = ${id}`);
      res.json(rows);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
  })
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
module.exports = router;
