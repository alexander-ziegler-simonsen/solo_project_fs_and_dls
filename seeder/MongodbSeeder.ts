
import { MongoClient, OptionalUnlessRequiredId } from "mongodb";
import 'dotenv/config';

const mon_user= process.env.MONGO_USERNAME;
const mon_pass= process.env.MONGO_PASSWORD;
const mon_host= process.env.MONGO_HOST;
const mon_port= process.env.MONGO_PORT;
const mon_new_db= process.env.MONGO_NEW_DB;
const mon_new_user= process.env.MONGO_NEW_USERNAME;
const mon_new_pass= process.env.MONGO_NEW_PASSWORD;

const uri = `mongodb://${mon_user}:${mon_pass}@${mon_host}:${mon_port}/`; // or your MongoDB connection string
const client = new MongoClient(uri);

export async function setDbAndFirstUser() {
    try {

        console.log("mongo-the setDbAndFirstUser function was called");

        // TODO - check if this is the first time this code is running, if no, then don't run it
        await client.connect();
        const db = client.db(mon_new_db);
        await db.collection("init").insertOne({done: (new Date().toISOString())});

        const commandResult = await db.command({
            createUser: mon_new_user,
            pwd: mon_new_pass,
            roles: [{ role: "readWrite", db: mon_new_db }]
        });

        console.log("mongo-User created:", commandResult);
    } catch (err) {
        console.error("mongo-Error creating user:", err);
    } finally {
        await client.close();
    }
}

export async function AddData<T>( insertData: OptionalUnlessRequiredId<T>[], tablename: string) {
    try {

        console.log("mongo-the AddData<T> function was called");
        console.log("mongo-table name", tablename);
        console.log("mongo-data adding", JSON.stringify(insertData));


        await client.connect();

        // data
        const data: OptionalUnlessRequiredId<T>[] = insertData;

        // db
        const database = client.db(mon_new_db);

        // schema 
        const item = database.collection<T>(tablename);

        const result = await item.insertMany(insertData);
        
        console.log(`mongo-${result.insertedCount} documents were inserted`);
    } catch (err) {
        console.error("mongo-Error adding Items:", err);
    } finally {
        await client.close();
    }
}
