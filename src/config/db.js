const { Pool } = require('pg') //poll é para evitar q todas as vezes tenha q enviar login e senha

module.exports = new Pool({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "gymmanager"
})