const express = require('express');
const router = express.Router();
const db = require('../db/db');

// --- Rotas ESPECÍFICAS para Ferramenta (CRUD completo) ---
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
    const { nome, tipo, quantidade, localizacao } = req.body;

    if (!nome || !tipo || quantidade === undefined || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a ferramenta.' });
    }
    try {
        const query = 'INSERT INTO Ferramenta (Nome, Tipo, Quantidade, Localizacao) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [nome, tipo, quantidade, localizacao]);
        res.status(201).json({ message: 'Ferramenta adicionada com sucesso.', id: result.insertId });
    } catch (err) {
        console.error('Erro ao adicionar ferramenta:', err);
        res.status(500).json({ error: 'Erro ao adicionar ferramenta.' });
    }
});

router.put('/Ferramenta/:codigo', async (req, res) => {
    console.log(`Requisição PUT /api/Ferramenta/${req.params.codigo} recebida!`);
    const { codigo } = req.params;
    const { nome, tipo, quantidade, localizacao } = req.body;

    if (!nome || !tipo || quantidade === undefined || !localizacao) {
        return res.status(400).json({ error: 'Todos os campos (nome, tipo, quantidade, localizacao) são obrigatórios para a atualização da ferramenta.' });
    }
    try {
        const query = 'UPDATE Ferramenta SET Nome = ?, Tipo = ?, Quantidade = ?, Localizacao = ? WHERE Codigo = ?';
        const [result] = await db.query(query, [nome, tipo, quantidade, localizacao, codigo]);
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


// --- Rotas para a Agenda ---
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

// Rota GET /Eventos (simplificada, sem o campo Tipo)
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

// Rota POST /Eventos (simplificada)
router.post('/Eventos', async (req, res) => {
    console.log('Requisição POST /api/Eventos recebida!');
    const { title, date, adminCodigo } = req.body;
    

    if (!title || !date) {
        return res.status(400).json({ error: 'Os campos título e data são obrigatórios para o evento.' });
    }

    if (!adminCodigo) {
        return res.status(400).json({ error: 'ID do usuário administrador não identificado.' });
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

// Rota PUT /Eventos (simplificada)
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


// --- Rotas Genéricas (Limpas para evitar conflitos) ---
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

const tabelas = [
    'Departamento',
    'Funcionario',
    'Administrador',
    'Operario',
    // 'Evento', // Removida para não conflitar com a rota específica
    'Lembrete',
    'Compra',
    'Material',
    'Compra_Material',
    // 'Emprestimo', // Removida para não conflitar com a rota específica
    'Emprestimo_Ferramenta'
];
tabelas.forEach(criarRotaParaTabela);


module.exports = router;