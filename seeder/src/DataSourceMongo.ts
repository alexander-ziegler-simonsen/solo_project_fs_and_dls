import "reflect-metadata";
import { DataSource } from "typeorm";
import { Item } from "./entities/mongo/Item"; 
// import { Order } from "./entities/mongo/Order";
// import { OrderItem } from "./entities/mongo/OrderItem";
import { ItemGroup } from "./entities/mongo/ItemGroup";
import { User } from "./entities/mongo/User";
import { Storage } from "./entities/mongo/Storage";
import 'dotenv/config';

// const mon_new_db= process.env.MONGO_NEW_DB;
// const mon_new_user= process.env.MONGO_NEW_USERNAME;
// const mon_new_pass= process.env.MONGO_NEW_PASSWORD;

const mongo_port: number = parseInt(process.env.MONGO_PORT) || 5433;
const mongo_use: string = process.env.MONGO_USERNAME || "admin";
const mongo_pass: string = process.env.MONGO_PASSWORD || "password";
const mongo_db = process.env.MONGO_DB || "rizz";
const mongo_host = process.env.MONGO_HOST || "localhost";

export const DataSourceMongo = new DataSource({
    type: "mongodb",
    host: mongo_host,
    port: mongo_port,
    database: mongo_db,
    username: mongo_use,
    password: mongo_pass,
    synchronize: true,
    logging: false,
    entities: [Item, ItemGroup, User, Storage],
    migrations: [],
    subscribers: [],
})
