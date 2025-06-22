// backend/routes.js
const express = require('express');
const router = express.Router();
const db = require('./db/db'); // Caminho CORRETO para o db.js


function criarRotaParaTabela(nomeTabela) {
    router.get(`/${nomeTabela}`, async (req, res) => {
        try {
            const [rows] = await db.query(`SELECT * FROM ${nomeTabela}`);
            res.json(rows);
        } catch (err) {
            console.error(`Erro ao buscar dados da tabela ${nomeTabela}:`, err);
            res.status(500).json({ error: `Erro ao buscar dados da tabela ${nomeTabela}` });
        }
    });
}


// --- Rotas ESPECÍFICAS para Ferramenta (GET, POST, PUT, DELETE) ---
router.get('/Ferramenta', async (req, res) => {
    console.log('Requisição GET /api/Ferramenta recebida!');
    try {
        const [rows] = await db.query(`SELECT Codigo, Nome, Tipo, Quantidade, Localizacao FROM Ferramenta`);
        res.json(rows);
    } catch (err) {
        console.error('Erro ao buscar ferramentas:', err);
        res.status(500).json({ error: 'Erro ao buscar ferramentas.' });
    }
});

router.post('/Ferramenta', async (req, res) => {
    console.log('Requisição POST /api/Ferramenta recebida!');
    // AQUI: A desestruturação do req.body em camelCase está correta.
    const { nome, tipo, quantidade, localizacao } = req.body;

    if (!nome || !tipo || quantidade === undefined || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a ferramenta.' });
    }
    try {
        // AQUI: Use os nomes das colunas como estão no seu DB (PascalCase).
        // Os valores (?, ?, ?, ?) receberão os dados em camelCase.
        const query = 'INSERT INTO Ferramenta (Nome, Tipo, Quantidade, Localizacao) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [nome, tipo, quantidade, localizacao]); // Passando os valores em camelCase
        res.status(201).json({ message: 'Ferramenta adicionada com sucesso.', id: result.insertId });
    } catch (err) {
        console.error('Erro ao adicionar ferramenta:', err);
        res.status(500).json({ error: 'Erro ao adicionar ferramenta.' });
    }
});


router.put('/Ferramenta/:codigo', async (req, res) => {
    console.log(`Requisição PUT /api/Ferramenta/${req.params.codigo} recebida!`);
    const { codigo } = req.params; // Parâmetro de rota
   
    const { nome, tipo, quantidade, localizacao } = req.body; 

    if (!nome || !tipo || quantidade === undefined || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a atualização da ferramenta.' });
    }
    try {
        // AQUI: Use os nomes das colunas como estão no seu DB (PascalCase).
        // Os valores (?, ?, ?, ?) receberão os dados em camelCase.
        const query = 'UPDATE Ferramenta SET Nome = ?, Tipo = ?, Quantidade = ?, Localizacao = ? WHERE Codigo = ?';
        const [result] = await db.query(query, [nome, tipo, quantidade, localizacao, codigo]); // Passando os valores em camelCase
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Ferramenta não encontrada.' });
        }
        res.json({ message: 'Ferramenta atualizada com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar ferramenta:', err);
        res.status(500).json({ error: 'Erro ao atualizar ferramenta.' });
    }
});

router.delete('/Ferramenta/:codigo', async (req, res) => {
    console.log(`Requisição DELETE /api/Ferramenta/${req.params.codigo} recebida!`);
    const { codigo } = req.params;
    try {
        const query = 'DELETE FROM Ferramenta WHERE Codigo = ?';
        const [result] = await db.query(query, [codigo]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Ferramenta não encontrada.' });
        }
        res.json({ message: 'Ferramenta excluída com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir ferramenta:', err);
        res.status(500).json({ error: 'Erro ao excluir ferramenta.' });
    }
});


router.get(`/EmprestimoFuncionario`, async (req, res) => {
    console.log('Requisição GET /api/EmprestimoFuncionario recebida!');
    try {
        const [rows] = await db.query(`SELECT Funcionario.Nome, Funcionario.Departamento_Codigo, Emprestimo.Data_Retirada, Emprestimo.Data_Devolucao FROM Funcionario inner join Emprestimo on Funcionario.Codigo = Emprestimo.Operario_Funcionario_Codigo`);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: `Erro ao buscar dados da tabela ` });
    }
});

// ROTA PARA BUSCAR EMPRÉSTIMOS PARA A AGENDA
router.get('/Emprestimos', async (req, res) => {
  console.log('Requisição GET /api/Emprestimos recebida!');
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
 console.error('Erro ao buscar empréstimos:', err);
 res.status(500).json({ error: 'Erro ao buscar dados de empréstimos.' });
  }
});

router.get('/Eventos', async (req, res) => {
  console.log('Requisição GET /api/Eventos recebida!');
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
 console.error('Erro ao buscar eventos:', err);
 res.status(500).json({ error: 'Erro ao buscar dados de eventos.' });
  }
});

router.post('/Eventos', async (req, res) => {
    console.log('Requisição POST /api/Eventos recebida!');
    const {title, date} = req.body;
     const adminCodigo = 14;

    if (!title || !date) {
        return res.status(400).json({ error: 'Os campos título e data são obrigatórios para o evento.' });
    }
    try {
        const query = 'INSERT INTO Evento (Titulo, Data, Administrador_Funcionario_Codigo) VALUES (?, ?, ?)';
        const [result] = await db.query(query, [title, date, adminCodigo]); 
        res.status(201).json({ message: 'Evento adicionado com sucesso.', id: result.insertId });
    } catch (err) {
        console.error('Erro ao adicionar evento:', err);
        res.status(500).json({ error: 'Erro ao adicionar evento.' });
    }   
});

router.put('/Eventos/:codigo', async (req, res) => {
    console.log(`Requisição PUT /api/Eventos/${req.params.codigo} recebida!`);
    const { codigo } = req.params; 
    const { title, date } = req.body; 

    if (!title || !date) {
        return res.status(400).json({ error: 'Campos título e data são obrigatórios para eventos.' });
    }
    try {
        const query = 'UPDATE Evento SET Titulo = ?, Data = ? WHERE Codigo = ?';
        const [result] = await db.query(query, [title, date, codigo]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        res.json({ message: 'Evento atualizado com sucesso.' });
    } catch (err) {
        console.error('Erro ao atualizar evento:', err);
        res.status(500).json({ error: 'Erro ao atualizar evento.' });
    }
});

router.delete('/Eventos/:codigo', async (req, res) => {
    console.log(`Requisição DELETE /api/Eventos/${req.params.codigo} recebida!`);
    const { codigo } = req.params;
    try {
        const query = 'DELETE FROM Evento WHERE Codigo = ?';
        const [result] = await db.query(query, [codigo]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Evento não encontrado.' });
        }
        res.json({ message: 'Evento excluído com sucesso.' });
    } catch (err) {
        console.error('Erro ao excluir evento:', err);
        res.status(500).json({ error: 'Erro ao excluir evento.' });
    }
});


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
    'Emprestimo',
    'Emprestimo_Ferramenta'
];
tabelas.forEach(criarRotaParaTabela);


module.exports = router;