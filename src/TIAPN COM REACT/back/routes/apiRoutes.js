const express = require("express");
const router = express.Router();
const db = require("../db/db");

// --- Rotas ESPECÍFICAS para Ferramenta (CRUD completo) ---
router.get("/Ferramenta", async (req, res) => {
  console.log("Requisição GET /api/Ferramenta recebida!");
  try {
    const [rows] = await db.query(
      `SELECT Codigo, Nome, Tipo, Quantidade, Localizacao FROM Ferramenta`
    );
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar ferramentas:", err);
    res.status(500).json({ error: "Erro ao buscar ferramentas." });
  }
});

router.post("/Ferramenta", async (req, res) => {
  console.log("Requisição POST /api/Ferramenta recebida!");
  const { nome, tipo, quantidade, localizacao } = req.body;

  if (!nome || !tipo || quantidade === undefined || !localizacao) {
    return res.status(400).json({
      error:
        "Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a ferramenta.",
    });
  }
  try {
    const query =
      "INSERT INTO Ferramenta (Nome, Tipo, Quantidade, Localizacao) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(query, [
      nome,
      tipo,
      quantidade,
      localizacao,
    ]);
    res.status(201).json({
      message: "Ferramenta adicionada com sucesso.",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Erro ao adicionar ferramenta:", err);
    res.status(500).json({ error: "Erro ao adicionar ferramenta." });
  }
});

router.put("/Ferramenta/:codigo", async (req, res) => {
  console.log(`Requisição PUT /api/Ferramenta/${req.params.codigo} recebida!`);
  const { codigo } = req.params;
  const { nome, tipo, quantidade, localizacao } = req.body;

  if (!nome || !tipo || quantidade === undefined || !localizacao) {
    return res.status(400).json({
      error:
        "Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a atualização da ferramenta.",
    });
  }
  try {
    const query =
      "UPDATE Ferramenta SET Nome = ?, Tipo = ?, Quantidade = ?, Localizacao = ? WHERE Codigo = ?";
    const [result] = await db.query(query, [
      nome,
      tipo,
      quantidade,
      localizacao,
      codigo,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ferramenta não encontrada." });
    }
    res.json({ message: "Ferramenta atualizada com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar ferramenta:", err);
    res.status(500).json({ error: "Erro ao atualizar ferramenta." });
  }
});

router.delete("/Ferramenta/:codigo", async (req, res) => {
  console.log(
    `Requisição DELETE /api/Ferramenta/${req.params.codigo} recebida!`
  );
  const { codigo } = req.params;
  try {
    const query = "DELETE FROM Ferramenta WHERE Codigo = ?";
    const [result] = await db.query(query, [codigo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ferramenta não encontrada." });
    }
    res.json({ message: "Ferramenta excluída com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir ferramenta:", err);
    res.status(500).json({ error: "Erro ao excluir ferramenta." });
  }
});

// --- Rotas para a Agenda ---
router.get("/Emprestimos", async (req, res) => {
  console.log("Requisição GET /api/Emprestimos recebida!");
  try {
    const query = `
            SELECT 
                e.Codigo, 
                e.Descricao, 
                e.Data_Retirada, 
                e.Data_Devolucao,
                f.Nome as FuncionarioNome
            FROM Emprestimo as e
            LEFT JOIN Funcionario as f ON e.Operario_Funcionario_Codigo = f.Codigo
        `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar empréstimos:", err);
    res.status(500).json({ error: "Erro ao buscar dados de empréstimos." });
  }
});

// Rota GET /Eventos (simplificada, sem o campo Tipo)
router.get("/Eventos", async (req, res) => {
  console.log("Requisição GET /api/Eventos recebida!");
  try {
    const query = `
            SELECT 
                ev.Codigo, 
                ev.Titulo, 
                ev.Data,
                f.Nome as AdminNome
            FROM Evento as ev
            LEFT JOIN Funcionario as f ON ev.Administrador_Funcionario_Codigo = f.Codigo
        `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
    res.status(500).json({ error: "Erro ao buscar dados de eventos." });
  }
});

// Rota POST /Eventos (simplificada)
router.post("/Eventos", async (req, res) => {
  console.log("Requisição POST /api/Eventos recebida!");
  const { title, date } = req.body;
  const adminCodigo = 14; // Usando um ID fixo para o administrador

  if (!title || !date) {
    return res.status(400).json({
      error: "Os campos título e data são obrigatórios para o evento.",
    });
  }
  try {
    const query =
      "INSERT INTO Evento (Titulo, Data, Administrador_Funcionario_Codigo) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [title, date, adminCodigo]);
    res
      .status(201)
      .json({ message: "Evento adicionado com sucesso.", id: result.insertId });
  } catch (err) {
    console.error("Erro ao adicionar evento:", err);
    res.status(500).json({ error: "Erro ao adicionar evento." });
  }
});

// Rota PUT /Eventos (simplificada)
router.put("/Eventos/:codigo", async (req, res) => {
  console.log(`Requisição PUT /api/Eventos/${req.params.codigo} recebida!`);
  const { codigo } = req.params;
  const { title, date } = req.body;

  if (!title || !date) {
    return res
      .status(400)
      .json({ error: "Campos título e data são obrigatórios para eventos." });
  }
  try {
    const query = "UPDATE Evento SET Titulo = ?, Data = ? WHERE Codigo = ?";
    const [result] = await db.query(query, [title, date, codigo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Evento não encontrado." });
    }
    res.json({ message: "Evento atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar evento:", err);
    res.status(500).json({ error: "Erro ao atualizar evento." });
  }
});

router.delete("/Eventos/:codigo", async (req, res) => {
  console.log(`Requisição DELETE /api/Eventos/${req.params.codigo} recebida!`);
  const { codigo } = req.params;
  try {
    const query = "DELETE FROM Evento WHERE Codigo = ?";
    const [result] = await db.query(query, [codigo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Evento não encontrado." });
    }
    res.json({ message: "Evento excluído com sucesso." });
  } catch (err) {
    console.error("Erro ao excluir evento:", err);
    res.status(500).json({ error: "Erro ao excluir evento." });
  }
});

// --- Rotas Genéricas (Limpas para evitar conflitos) ---
function criarRotaParaTabela(nomeTabela) {
  router.get(`/${nomeTabela}`, async (req, res) => {
    try {
      const [rows] = await db.query(`SELECT * FROM ${nomeTabela}`);
      res.json(rows);
    } catch (err) {
      console.error(`Erro ao buscar dados da tabela ${nomeTabela}:`, err);
      res
        .status(500)
        .json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
    }
  });
}

// Rotas para Lembrete

// GET /Lembrete
router.get("/Lembrete", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT Codigo, Observacao FROM Lembrete ORDER BY Codigo DESC"
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar lembretes" });
  }
});

// POST /Lembrete
router.post("/Lembrete", async (req, res) => {
  const { observacao, administrador_codigo } = req.body;

  console.log(req.body);

  if (!observacao || !administrador_codigo) {
    return res.status(400).json({
      error: "Os campos observacao e administrador_codigo são obrigatórios.",
    });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO Lembrete (Observacao, Administrador_Funcionario_Codigo) VALUES (?, ?)`,
      [observacao, administrador_codigo]
    );
    res.status(201).json({ Codigo: result.insertId, Observacao: observacao });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Erro ao inserir lembrete", detalhes: err.sqlMessage });
  }
});

// DELETE /Lembrete/:id
router.delete("/Lembrete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.query("DELETE FROM Lembrete WHERE Codigo = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Lembrete não encontrado." });
    }
    res.status(200).json({ message: "Lembrete deletado com sucesso." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao deletar lembrete" });
  }
});

router.get(`/ListaEmprestimos`, async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT * FROM Emprestimo`);
    res.json(rows);
  } catch (err) {
    console.error(`Erro ao buscar dados da tabela ${nomeTabela}:`, err);
    res
      .status(500)
      .json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
  }
});

router.get(`/EmprestimoAtrasado`, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT Funcionario.Nome, Ferramenta.nome, Emprestimo_Ferramenta.Codigo_Ferramenta, Emprestimo.Data_Devolucao FROM Emprestimo inner join Funcionario on Emprestimo.Operario_Funcionario_Codigo = Funcionario.Codigo inner join Ferramenta inner join Emprestimo_Ferramenta on Emprestimo_Ferramenta.Codigo_Ferramenta = Ferramenta.Codigo`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
  }
});

router.get(`/EmprestimoFuncionario`, async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT Funcionario.Nome, Departamento.nome, Emprestimo.Data_Retirada, Emprestimo.Data_Devolucao, Emprestimo_Ferramenta.Codigo_Ferramenta, Emprestimo.Codigo FROM Funcionario inner join Emprestimo on Funcionario.Codigo = Emprestimo.Operario_Funcionario_Codigo inner join Departamento on Funcionario.Departamento_Codigo = Departamento.Codigo inner join Emprestimo_Ferramenta on Emprestimo.Codigo = Emprestimo_Ferramenta.Emprestimo_Codigo`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
  }
});

router.delete(`/Emprestimo/:id`, async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.query(
      `DELETE FROM Emprestimo WHERE codigo = ${id}`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
  }
});

router.post("/Emprestimo", async (req, res) => {
  let codigo_func = req.body.codigo_func;
  let codigo_ferr = req.body.codigo_ferr;
  let quantidade = req.body.quantidade;
  let data_dev = req.body.data_dev;
  let data_ret = req.body.data_ret;
  let desc = req.body.desc;

  try {
    const [result] = await db.query(
      `INSERT INTO Emprestimo (Descricao, Data_Retirada, Data_Devolucao, Operario_Funcionario_Codigo, quantidade) VALUES (?,?,?,?,?)`,
      [desc, data_ret, data_dev, codigo_func, quantidade]
    );

    const [result3] = await db.query(
      `SELECT codigo FROM Emprestimo WHERE codigo = (SELECT MAX(codigo) FROM Emprestimo);`,
      [codigo_ferr]
    );

    let cod_emp = result3[0].codigo;

    const [result2] = await db.query(
      `INSERT INTO Emprestimo_Ferramenta (Codigo_Ferramenta, Emprestimo_Codigo) VALUES (?, ?)`,
      [codigo_ferr, cod_emp]
    );
  } catch (err) {
    console.error("Erro ao inserir ferramenta:", err);
    res.status(500).json({ error: "Erro ao cadastrar a ferramenta." });
  }
});

const tabelas = [
  "Departamento",
  "Funcionario",
  "Administrador",
  "Operario",
  // 'Evento', // Removida para não conflitar com a rota específica
  "Lembrete",
  "Compra",
  "Material",
  "Compra_Material",
  // 'Emprestimo', // Removida para não conflitar com a rota específica
  "Emprestimo_Ferramenta",
];

tabelas.forEach(criarRotaParaTabela);

//Rotas Config

router.put("/Configuracao", async (req, res) => {
  

  console.log(req.body);
  let email = req.body.Email
  let senha = req.body.Senha

  try {
    const query = "UPDATE Administrador SET Senha = ? WHERE Email = ?";
    const [result] = await db.query(query, [senha, email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Evento não encontrado." });
    }
    res.json({ message: "Evento atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar evento:", err);
    res.status(500).json({ error: "Erro ao atualizar evento." });
  }
});

//Fim Config

//Rota abrir funcionario

router.get("/funcionario/:codigo", async (req, res) => {
  const { codigo } = req.params;
  console.log("teste");
  try {
    const [rows] = await db.query(
      "SELECT * FROM Funcionario WHERE Codigo = ?",
      [codigo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Funcionário não encontrado." });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Erro ao buscar funcionário:", err);
    res
      .status(500)
      .json({ error: "Erro interno ao buscar dados do funcionário." });
  }
});

router.post("/funcionario", async (req, res) => {
  let {
    Cargo,
    Nome,
    Telefone,
    Data_Nascimento,
    Rua,
    Numero,
    Cidade,
    CPF,
    Departamento_Codigo,
  } = req.body;

  // Validação dos campos obrigatórios
  if (!Nome || !Cargo || !CPF) {
    return res
      .status(400)
      .json({ error: "Campos Nome, Cargo e CPF são obrigatórios." });
  }

  let dataFormatada = null;
  if (Data_Nascimento) {
    dataFormatada = Data_Nascimento.split("T")[0];
  }

  try {
    const [result] = await db.query(
      `INSERT INTO Funcionario (Cargo, Nome, Telefone, Data_Nascimento, Rua, Numero, Cidade, CPF,Departamento_Codigo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,

      [
        Cargo,
        Nome,
        Telefone || null,
        dataFormatada,
        Rua || null,
        Numero || null,
        Cidade || null,
        CPF,
        Departamento_Codigo || null,
      ]
    );

    const [result2] = await db.query(
      `SELECT codigo FROM Funcionario WHERE codigo = (SELECT MAX(codigo) FROM Funcionario);`
    );

    let funcionario_codigo = result2[0].codigo;

    const [result3] = await db.query(
      `INSERT INTO Operario (saldo, funcionario_codigo) VALUES (?,?);`,
      [0, funcionario_codigo]
    );

    return res.status(201).json({
      message: "Funcionário cadastrado com sucesso.",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Erro ao cadastrar funcionário:", err);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res
        .status(400)
        .json({ error: "O Departamento informado não existe." });
    }

    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Este CPF ou outro campo único já está cadastrado." });
    }

    return res
      .status(500)
      .json({ error: "Erro interno ao cadastrar funcionário." });
  }
});

router.put("/funcionario/:codigo", async (req, res) => {
  const { codigo } = req.params; // Pega o código da URL

  const {
    Cargo,
    Nome,
    Telefone,
    Data_Nascimento,
    Rua,
    Numero,
    Cidade,
    CPF,
    Departamento_Codigo,
  } = req.body;

  if (!Nome || !Cargo || !CPF) {
    return res
      .status(400)
      .json({ error: "Campos Nome, Cargo e CPF são obrigatórios." });
  }

  try {
    const sql = `
      UPDATE Funcionario
      SET
        Cargo = ?, Nome = ?, Telefone = ?, Data_Nascimento = ?,
        Rua = ?, Numero = ?, Cidade = ?, CPF = ?, Departamento_Codigo = ?
      WHERE
        Codigo = ?
    `;

    const [result] = await db.query(sql, [
      Cargo,
      Nome,
      Telefone,
      Data_Nascimento,
      Rua,
      Numero,
      Cidade,
      CPF,
      Departamento_Codigo,
      codigo,
    ]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Funcionário não encontrado para atualização." });
    }

    res.json({ message: "Funcionário atualizado com sucesso." });
  } catch (err) {
    console.error("Erro ao atualizar funcionário:", err);

    if (err.code === "ER_DUP_ENTRY") {
      return res
        .status(409)
        .json({ error: "Este CPF já pertence a outro funcionário." });
    }

    res.status(500).json({ error: "Erro interno ao atualizar o funcionário." });
  }
});

module.exports = router;
