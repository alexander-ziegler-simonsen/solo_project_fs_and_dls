import { DataSource } from "typeorm";
import 'dotenv/config';
import "reflect-metadata";

// entites
import { Item_post } from "./entities/Item";
import { ItemGroup_post } from "./entities/ItemGroup";
import { Order_post } from "./entities/Order";
import { OrderItem_post } from "./entities/OrderItem";
import { User_post } from "./entities/User";
import { Storage_post } from "./entities/Storage";

// TODO - fix postgres port
const post_port = process.env.POSTGRES_PORT;
const post_use: string = process.env.POSTGRES_USERNAME || "admin";
const post_pass: string = process.env.POSTGRES_PASSWORD || "password";
const post_db = process.env.POSTGRES_DB || "rizz";
const post_host = process.env.POSTGRES_HOST || "localhost";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: post_host,
    port: 5432,
    synchronize: true,
    entities: [Item_post, User_post, OrderItem_post, Order_post, Storage_post, ItemGroup_post],
    username: post_use,
    password: post_pass,
    database: post_db,
});