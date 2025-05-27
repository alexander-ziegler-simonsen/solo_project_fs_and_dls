
import { MongoClient } from "mongodb";
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
        // TODO - check if this is the first time this code is running, if no, then don't run it
        await client.connect();
        client.db("test", )
        const db = client.db(mon_new_db);
        await db.collection("init").insertOne({done:true});

        const commandResult = await db.command({
            createUser: mon_new_user,
            pwd: mon_new_pass,
            roles: [{ role: "readWrite", db: mon_new_db }]
        });

        console.log("User created:", commandResult);
    } catch (err) {
        console.error("Error creating user:", err);
    } finally {
        await client.close();
    }
}



// import mongoose from "mongoose"
// import 'dotenv/config'
// import * as fs from 'fs'

// const MON_PORT = process.env.MONGO_PORT;
// const MON_HOST = process.env.MONGO_HOST;
// const MON_USERNAME = process.env.MONGO_USERNAME;
// const MON_PASSWORD = process.env.MONGO_PASSWORD;
// const MON_DB = process.env.MONGO_DB;

// // some test data
// const rawProducts = fs.readFileSync("./data/Items.json", "utf-8")
// const ProductData = JSON.parse(rawProducts)

// // the schema that is build like our data 
// // (without id, since mongodb generates those on its own)
// const productSchema = new mongoose.Schema({
//     name: String,
//     price: Number,
//     info: String,
//     description: String,
//     image: String
// })

// // mongoose compiles a model, based on our schema
// //                              "product", schema, collection name
// const product = mongoose.model("product", productSchema, "products");


// // TODO - rewrite this code, so it looks better

// // delete every product first
// mongoose.connect(``) // connection to mongodb
// .then(() => {
//     // delete every product first
//     product.deleteMany({}) // if there is a empty {} in delete many, it will delete the whole table
//     .then(() => {
//         console.log("all existing products was deleted")

//         mongoose.connect(`mongodb://${MON_USERNAME}:${MON_PASSWORD}@${MON_HOST}:${MON_PORT}/${MON_DB}`) // connection to mongodb
//         .then(() => {
//             // save all the products to the db
//             product.insertMany(ProductData).then(() => {
//                 console.log("all products added")
//             }).catch((err) => {
//                 console.log(err)
//             })

//         })
//         .catch((err) => {
//             console.log(err);
//         })
//     })
// .catch((err) => {
//     console.log(err)
// })
        
//     })
//     .catch((err) => {
//         console.log(err);
//     })


