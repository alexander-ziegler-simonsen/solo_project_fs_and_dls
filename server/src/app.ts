import express from "express";
import "reflect-metadata";

// routes
import ItemRouter from "./Routes/ItemRouter";
import ItemGroupRouter from "./Routes/ItemGroupRouter";
import UserRouter from "./Routes/UserRouter";
import StorageRouter from "./Routes/StorageRouter";
import OrderItemRouter from "./Routes/OrderItemRouter";
import OrderRouter from "./Routes/OrderRouter";

// entites
// import { Item, Item_post } from "./entities/Item";
// import { ItemGroup, ItemGroup_post } from "./entities/ItemGroup";
// import { Order, Order_post } from "./entities/Order";
// import { OrderItem, OrderItem_post } from "./entities/OrderItem";
// import { User, User_post } from "./entities/User";

// dataSources
import { MongodbDataSource, PostgresDataSource } from "./DataSources";

const app = express();
const PORT = Number(process.env.PORT) || 8080;

app.use(express.json());

// use routes
app.use(ItemRouter);
app.use(UserRouter);
app.use(StorageRouter);
app.use(OrderItemRouter);
app.use(OrderRouter);
app.use(ItemGroupRouter);


async function main() {
    // login  -----------------------------------

    app.post("/login", (req, res) => {
        res.send({ data: "this is data" })
    })

    // connect to mongodb
    await MongodbDataSource.initialize()
    console.log("mongodb DataSource has been initialized!");

    // let user_mon = new User();
    // user_mon.username = "test";
    // user_mon.password = "test";
    // user_mon.email = "test";
    // user_mon.phoneNumber = "test";
    // user_mon.address = "test";
    // user_mon = await MongodbDataSource.manager.save(user_mon);

    // connect to postgres
    await PostgresDataSource.initialize()
    console.log("postgres DataSource has been initialized!");

    // the last part of the server -----------------------------

    // let user_post = new User_post();
    // user_post.username = "test";
    // user_post.password = "test";
    // user_post.email = "test";
    // user_post.phoneNumber = "test";
    // user_post.address = "test";
    // user_post = await PostgresDataSource.manager.save(user_post);

    app.listen(PORT, () => console.log("server is running on port", PORT));
}

main()