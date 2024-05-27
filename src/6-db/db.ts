import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg'
const {Client} = pg

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT
})

client.connect()


export default client