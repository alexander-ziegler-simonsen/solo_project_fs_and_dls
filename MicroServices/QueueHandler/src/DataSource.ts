import { DataSource } from "typeorm";
import 'dotenv/config';
import "reflect-metadata";

// entites
import { Item_post } from "./Entites/Item_post";
import { ItemGroup_post } from "./Entites/ItemGroup_post";
import { Order_post } from "./Entites/Order_post";
import { OrderItem_post } from "./Entites/OrderItem_post";
import { User_post } from "./Entites/User_post";
import { Storage_post } from "./Entites/Storage_post";

// TODO - fix postgres port
const post_port = process.env.POSTGRES_PORT;
const post_use: string = process.env.POSTGRES_USERNAME || "username";
const post_pass: string = process.env.POSTGRES_PASSWORD || "password";
const post_db = process.env.POSTGRES_DB;

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