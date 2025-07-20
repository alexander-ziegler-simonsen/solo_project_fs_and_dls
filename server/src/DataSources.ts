import { DataSource } from "typeorm";
import 'dotenv/config';
import "reflect-metadata";

// entites
import { Item, Item_post } from "./entities/Item";
import { ItemGroup, ItemGroup_post } from "./entities/ItemGroup";
import { Order, Order_post } from "./entities/Order";
import { OrderItem, OrderItem_post } from "./entities/OrderItem";
import { User, User_post } from "./entities/User";
import {Storage, Storage_post } from "./entities/Storage";

// TODO - fix mongodb port
const mon_port = process.env.MONGO_PORT || "27018";
const mon_use: string = process.env.MONGO_NEW_USERNAME || "user1";
const mon_pass: string = process.env.MONGO_NEW_PASSWORD || "password1";
const mon_host: string = process.env.MONGO_HOST || "localhost";
const mon_db = process.env.MONGO_NEW_DB || "rizz";

// TODO - fix postgres port
const post_port = process.env.POSTGRES_PORT || "5433";
const post_host = process.env.POSTGRES_HOST || "localhost";
const post_use: string = process.env.POSTGRES_USERNAME || "admin";
const post_pass: string = process.env.POSTGRES_PASSWORD || "password";
const post_db = process.env.POSTGRES_DB || "rizz";


export const MongodbDataSource = new 
DataSource({
    type: "mongodb",
    host: mon_host,
    port: Number(mon_port),
    synchronize: true,
    entities: [Item, User, ItemGroup, OrderItem, Order, Storage],
    username: mon_use,
    password: mon_pass,
    database: mon_db,
});

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: post_host,
    port: Number(post_port),
    synchronize: true,
    entities: [Item_post, User_post,ItemGroup_post, OrderItem_post, Order_post, Storage_post],
    username: post_use,
    password: post_pass,
    database: post_db,
});