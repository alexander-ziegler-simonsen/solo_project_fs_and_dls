import { DataSource } from "typeorm";
import 'dotenv/config';
import "reflect-metadata";

// entites
//import ItemGroup from "./entities/ItemGroup";
import { Item, Item_post } from "./entities/Item";
import { ItemGroup, ItemGroup_post } from "./entities/ItemGroup";
import { Order, Order_post } from "./entities/Order";
import { OrderItem, OrderItem_post } from "./entities/OrderItem";
import { User, User_post } from "./entities/User";
import {Storage, Storage_post } from "./entities/Storage";

// TODO - fix mongodb port
const mon_port = process.env.MONGO_PORT;
const mon_use: string = process.env.MONGO_USERNAME || "username";
const mon_pass: string = process.env.MONGO_PASSWORD || "password";
const mon_db = process.env.MONGO_DB;

// TODO - fix postgres port
const post_port = process.env.POSTGRES_PORT;
const post_use: string = process.env.POSTGRES_USERNAME || "username";
const post_pass: string = process.env.POSTGRES_PASSWORD || "password";
const post_db = process.env.POSTGRES_DB;


export const MongodbDataSource = new DataSource({
    type: "mongodb",
    host: "localhost",
    port: 27018,
    synchronize: true,
    entities: [Item, User, OrderItem, Order, Storage],
    username: mon_use,
    password: mon_pass,
    database: mon_db,
});

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5433,
    synchronize: true,
    entities: [Item_post, User_post, OrderItem_post, Order_post, Storage_post],
    username: post_use,
    password: post_pass,
    database: post_db,
});