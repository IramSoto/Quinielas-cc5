const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'IramADmin',
    database: 'QMundial2022',
    port: '5432'
})

module.exports = pool;
