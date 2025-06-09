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
        // MUDANÇA AQUI: 'Disponibilidade' para 'Quantidade'
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

// FAÇA A MESMA VERIFICAÇÃO E AJUSTE PARA router.put('/Ferramenta/:codigo', ...)
router.put('/Ferramenta/:codigo', async (req, res) => {
    console.log(`Requisição PUT /api/Ferramenta/${req.params.codigo} recebida!`);
    const { codigo } = req.params; // Parâmetro de rota
    // AQUI: A desestruturação do req.body em camelCase está correta.
    const { nome, tipo, quantidade, localizacao } = req.body; // Dados do corpo da requisição

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