import { Router } from "express";

import {Storage, Storage_post} from "../entities/Storage";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const StorageRouter = Router();
const StorageRespository = MongodbDataSource.getMongoRepository(Storage);

// mongo
StorageRouter.get("/storage", async (req, res) => {

    let output = await StorageRespository.find();

    res.send({ data: output });
})

StorageRouter.get("/storage/:id", async (req, res) => {

    let StorageId = req.params.id;
    let output = await StorageRespository.findOneBy({id: StorageId});

    res.send({ data: output });
})

// postgres
StorageRouter.post("/storage", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();

    let response = await rabbitHelper.handlePostToChannel("posts", "post", "storage", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

StorageRouter.put("/storage", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();

    let response = await rabbitHelper.handlePostToChannel("updates", "put", "storage", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

StorageRouter.delete("/storage", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();

    let response = await rabbitHelper.handlePostToChannel("deletes", "delete", "storage", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default StorageRouter;