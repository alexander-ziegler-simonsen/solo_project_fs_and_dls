import express from "express";
import "reflect-metadata";
import bodyParser from "body-parser";
import cors from "cors";

// routes
import ItemRouter from "./Routes/ItemRouter";
import ItemGroupRouter from "./Routes/ItemGroupRouter";
import UserRouter from "./Routes/UserRouter";
import StorageRouter from "./Routes/StorageRouter";
import OrderItemRouter from "./Routes/OrderItemRouter";
import OrderRouter from "./Routes/OrderRouter";
import LoginRouter from "./Routes/LoginRouter";

// dataSources
import { MongodbDataSource, PostgresDataSource } from "./DataSources";

const app = express();
const PORT = Number(process.env.API_PORT) || 3003;

const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost";
const CLIENT_PORT = process.env.CLIENT_PORT || 8083;


async function main() {
    console.log("start of main");
    console.log("env - api port:", PORT);
    console.log("env - CLIENT_HOST:", CLIENT_HOST);
    console.log("env - CLIENT_PORT:", CLIENT_PORT);

    // connect to mongodb
    await MongodbDataSource.initialize();
    console.log("mongodb DataSource has been initialized!");

    // connect to postgres
    await PostgresDataSource.initialize();
    console.log("postgres DataSource has been initialized!");
    
    app.use(bodyParser.json());

    app.use(cors({
        origin: `${CLIENT_HOST}:${CLIENT_PORT}`,
        credentials: true
    }));

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

    app.use('/login', LoginRouter);

    // for "health" check in my docker compose file
    app.get('/health', (req, res) => {res.sendStatus(200)});

    // the last part of the server -----------------------------

    app.listen(PORT, () => console.log("server is running on port", PORT));
}

main()