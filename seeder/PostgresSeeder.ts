import { Client } from "pg";
import 'dotenv/config';

const postgres_user= process.env.POSTGRES_USERNAME || "admin";
const postgres_pass= process.env.POSTGRES_PASSWORD || "password";
const postgres_host= process.env.POSTGRES_HOST || "localhost";
const postgres_port= process.env.POSTGRES_PORT || 5433;
const postgres_db= process.env.POSTGRES_DB || "rizz";

const uri = `posgres://${postgres_user}:${postgres_pass}@${postgres_host}:${postgres_port}`; // or your MongoDB connection string



const client = new Client({connectionString:uri });

export async function setDb() {
    try {
        // TODO - check if this is the first time this code is running, if no, then don't run it
        await client.connect();
        const res1 = await client.query(`CREATE DATABASE ${postgres_db};`);
        console.log(res1.rows[0].message);

        // give the 'user privilege to this new db
        const res2 = await client.query(`GRANT ALL PRIVILEGES ON DATABASE ${postgres_db} TO ${postgres_user};`);
        console.log(res2.rows[0].message);
    } catch (err) {
        console.error("Error creating db:", err);
    } finally {
        await client.end();
    }
}


