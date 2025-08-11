import { DataSource } from "typeorm";
import 'dotenv/config';
import "reflect-metadata";

// entites
import { Item, Item_post } from "./entities/Item";
import { ItemGroup, ItemGroup_post } from "./entities/ItemGroup";
import { Order, Order_post } from "./entities/Order";
import { OrderItem, OrderItem_post } from "./entities/OrderItem";
import { User, User_post } from "./entities/User";
import { Storage_post, Storage } from "./entities/Storage";

const post_port: number = parseInt(process.env.POSTGRES_PORT) || 5433;
const post_use: string = process.env.POSTGRES_USERNAME || "admin";
const post_pass: string = process.env.POSTGRES_PASSWORD || "password";
const post_db = process.env.POSTGRES_DB || "rizz";
const post_host = process.env.POSTGRES_HOST || "localhost";

const mongo_port: number = parseInt(process.env.MONGO_PORT) || 5433;
const mongo_use: string = process.env.MONGO_USERNAME || "admin";
const mongo_pass: string = process.env.MONGO_PASSWORD || "password";
const mongo_db = process.env.MONGO_DB || "rizz";
const mongo_host = process.env.MONGO_HOST || "localhost";


export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: post_host,
    port: post_port,
    synchronize: true,
    entities: [Item_post, User_post, OrderItem_post, Order_post, Storage_post, ItemGroup_post],
    username: post_use,
    password: post_pass,
    database: post_db,
});

export const MongodbDataSource = new DataSource({
    type: "mongodb",
    host: mongo_host,
    port: mongo_port,
    synchronize: true,
    entities: [Item, User, OrderItem, Order, Storage, ItemGroup],
    username: mongo_use,
    password: mongo_pass,
    database: mongo_db,
});