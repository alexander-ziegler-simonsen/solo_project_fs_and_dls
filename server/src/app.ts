import express from "express";
import "reflect-metadata";
import bodyParser from "body-parser";

// routes
import ItemRouter from "./Routes/ItemRouter";
import ItemGroupRouter from "./Routes/ItemGroupRouter";
import UserRouter from "./Routes/UserRouter";
import StorageRouter from "./Routes/StorageRouter";
import OrderItemRouter from "./Routes/OrderItemRouter";
import OrderRouter from "./Routes/OrderRouter";

// dataSources
import { MongodbDataSource, PostgresDataSource } from "./DataSources";

const app = express();
const PORT = Number(process.env.API_PORT) || 3003;

async function main() {
    // connect to mongodb
    await MongodbDataSource.initialize()
    console.log("mongodb DataSource has been initialized!");

    // connect to postgres
    await PostgresDataSource.initialize()
    console.log("postgres DataSource has been initialized!");
    
    app.use(bodyParser.json());

    // when json errors, DON'T leak errors to the client
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && 'body' in err) {
            return res.status(400).json({ error: 'Invalid JSON' });
        }
        next(err);
    });

    // use routes
    app.use(ItemRouter);
    app.use(UserRouter);
    app.use(StorageRouter);
    app.use(OrderItemRouter);
    app.use(OrderRouter);
    app.use(ItemGroupRouter);

    // login  -----------------------------------

    app.post("/login", (req, res) => {
        res.send({ data: "this is data" })
    })

    // the last part of the server -----------------------------

    app.listen(PORT, () => console.log("server is running on port", PORT));
}

main()