import express from 'express'
import pg from 'pg'
import { creds } from './creds.js'

const { Pool } = pg

const app = express()


app.get('/customers', async (req,res) => {
    const pool = new Pool(creds)
    const customers = await pool.query("SELECT * FROM customers", )
        .catch(err => res.status(500).send(err))
    res.send(customers.rows)
    pool.end
})


app.listen(3030, () => console.log('Listening on http://localhost:3030...'))