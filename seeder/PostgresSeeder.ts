import { Client, Pool } from "pg";
import 'dotenv/config';

const postgres_user = process.env.POSTGRES_USERNAME || "admin";
const postgres_pass = process.env.POSTGRES_PASSWORD || "password";
const postgres_host = process.env.POSTGRES_HOST || "localhost";
const postgres_port = process.env.POSTGRES_PORT || 5433;
const postgres_db = process.env.POSTGRES_DB || "rizz";

const FIRST_URL = `posgres://${postgres_user}:${postgres_pass}@${postgres_host}:${postgres_port}`; // or your MongoDB connection string
const URL = `posgres://${postgres_user}:${postgres_pass}@${postgres_host}:${postgres_port}/${postgres_db}`;


const client = new Client({ connectionString: URL });

// pool.ON('error', (err, client) => {
//     console.error('Unexpected error on idle client', err);
//     process.exit(-1);
// })

export async function setPostgresDb() {
    const firstClient = new Client({ connectionString: FIRST_URL });

    try {
        // TODO - check if this is the first time this code is running, if no, then don't run it
        await firstClient.connect();
        const res1 = await firstClient.query(`CREATE DATABASE ${postgres_db};`);
        //console.log(res1.rows[0].message);

        // give the 'user privilege to this new db
        const res2 = await firstClient.query(`GRANT ALL PRIVILEGES ON DATABASE ${postgres_db} TO ${postgres_user};`);
        //console.log(res2.rows[0].message);
    } catch (err) {
        console.error("Error creating db:", err);
    } finally {
        await firstClient.end();
    }
}

export async function setAllTables() {

    const pool = new Pool({
        user: postgres_user,
        host: postgres_host,
        database: postgres_db,
        password: postgres_pass,
        port: postgres_port
    })

    const poolClient = await pool.connect();

    const userT = `CREATE TABLE IF NOT EXISTS "user" (
            _id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            address TEXT NOT NULL
        );`

    const ItemGroupT = `CREATE TABLE IF NOT EXISTS itemGroup (
            _id SERIAL PRIMARY KEY,
            name TEXT NOT NULL
        );`

    const OrderT = `CREATE TABLE IF NOT EXISTS "order" (
            _id SERIAL PRIMARY KEY,
            fk_user_id INTEGER NOT NULL REFERENCES "user"(_id)
        );`

    const ItemT = `CREATE TABLE IF NOT EXISTS item (
            _id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            price NUMERIC(10, 2) NOT NULL,
            info TEXT NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL,
            fk_group_id INTEGER REFERENCES itemGroup(_id)
        );`;

    const OrderItemT = `CREATE TABLE IF NOT EXISTS orderItem (
            _id SERIAL PRIMARY KEY,
            fk_item_id INTEGER NOT NULL REFERENCES item(_id),
            fk_order_id INTEGER NOT NULL REFERENCES "order"(_id),
            count INTEGER NOT NULL,
            price NUMERIC(10, 2) NOT NULL
        );`;

    // const allTables = `BEGIN;        
    // COMMIT;`;
    try {
        await poolClient.query("BEGIN");

        await poolClient.query(userT);
        await poolClient.query(ItemGroupT);
        await poolClient.query(OrderT);
        await poolClient.query(ItemT);
        await poolClient.query(OrderItemT);

        await poolClient.query("COMMIT");

    } catch (err) {
        console.error("Error creating db:", err);
    } finally {
        await poolClient.release();
        await poolClient.end();
    }
}

export async function DropTable(tableToDrop) {
    const pool = new Pool({
        user: postgres_user,
        host: postgres_host,
        database: postgres_db,
        password: postgres_pass,
        port: postgres_port
    })

    const poolClient = await pool.connect();
    try {



        await poolClient.query(`DROP TABLE ${tableToDrop}`);


        // await poolClient.query("COMMIT");
    } catch (err) {
        console.error("Error adding Items:", err);
    } finally {
        await poolClient.release();
        await poolClient.end();
    }
}

export async function AddPostgresData<T>(tableName: string, keys: string[], insertData: T[]) {
    //await client.connect();
    const pool = new Pool({
        user: postgres_user,
        host: postgres_host,
        database: postgres_db,
        password: postgres_pass,
        port: postgres_port
    })

    const poolClient = await pool.connect();

    
    try {

        // empty the whole table first
        //await poolClient.query(`DELETE FROM ${tableName}`);
        //await poolClient.query("COMMIT");

        const values: string[] = [];
        const params: any[] = [];

        insertData.forEach((row, rowIndex) => {
            const paramPlaceholders = keys.map((_, colIndex) => {
                return `$${rowIndex * keys.length + colIndex + 1}`;
            });

            values.push(`(${paramPlaceholders.join(', ')})`);

            // Push the values in the correct column order
            keys.forEach((col) => {
                params.push((row as any)[col]);
            });
        })

        const query = { text: `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES ${values.join(', ')} RETURNING *` };

        let res = await poolClient.query(query, params);

        // await poolClient.query("COMMIT");
    } catch (err) {
        console.error("Error adding Items:", err);
    } finally {
        await poolClient.release();
        await poolClient.end();
    }
}



