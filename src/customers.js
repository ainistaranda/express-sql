import pg from 'pg'
import { creds } from '../creds.js'

const { Pool } = pg

export async function getAllCustomers(req,res) {
    const pool = new Pool(creds)
    const customers = await pool.query("SELECT * FROM customers", )
        .catch(err => res.status(500).send(err))
    res.send(customers.rows)
    pool.end
}

export async function getCustomerById(req,res) {
    const { customerId } = req.params
    const pool = new Pool(creds)
    const customers = await pool.query(`SELECT * FROM customers WHERE customer_id=${customerId}`, )
        .catch(err => res.status(500).send(err))
    res.send(customers.rows)
    pool.end
}

export async function addNewCustomer(req,res) {
    const { first_name, last_name, email, phone } = req.body
    const pool = new Pool(creds)
    const query = `INSERT INTO customers (first_name, last_name, email, phone)
        VALUES ('${first_name}', '${last_name}', '${email}', '${phone}')`
    console.log(query)
    await pool.query(query)
        .catch(err => res.status(500).send(err))
    res.status(201).send({ message: 'Customer succesfully created' })
    pool.end()
}