import { Router } from "express";

import {Storage, Storage_post} from "../entities/Storage";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost:5173";

const StorageRouter = Router();
const StorageRespository = MongodbDataSource.getMongoRepository(Storage);

// mongo
StorageRouter.get("/storage", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let output = await StorageRespository.find();

    res.send({ data: output });
})

StorageRouter.get("/storage/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let StorageId = req.params.id;
    let output = await StorageRespository.findOneBy({id: StorageId});

    res.send({ data: output });
})

// postgres
StorageRouter.post("/storage", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let response = rabbitHelper.handlePostToChannel("posts", "post", "storage", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

StorageRouter.put("/storage", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let response = rabbitHelper.handlePostToChannel("updates", "put", "storage", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

StorageRouter.delete("/storage", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let response = rabbitHelper.handlePostToChannel("deletes", "delete", "storage", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default StorageRouter;