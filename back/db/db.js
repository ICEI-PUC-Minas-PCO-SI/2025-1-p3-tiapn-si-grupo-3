// backend/db.js
const mysql = require('mysql2/promise');

// ----- INÍCIO DO NOSSO TESTE DE DEBUG -----
console.log("--- DEBUGANDO VARIÁVEIS DE AMBIENTE ---");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD existe?", !!process.env.DB_PASSWORD); // Apenas para confirmar que a senha não é nula
console.log("--------------------------------------");
// ----- FIM DO NOSSO TESTE DE DEBUG -----


const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  ssl: { 'rejectUnauthorized': false },
});

module.exports = pool;