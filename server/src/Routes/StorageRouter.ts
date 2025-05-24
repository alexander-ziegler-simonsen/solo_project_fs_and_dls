import { Router } from "express";

import {Storage, Storage_post} from "../entities/Storage";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";

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
    const response = await console.log("storage post");
    res.send({ data: "storage added" });
})

StorageRouter.put("/storage", async (req, res) => {
    const response = await console.log("storage updated");
    res.send({ data: "storage updated" });
})

StorageRouter.delete("/storage", async (req, res) => {
    const response = await console.log("storage delete");
    res.send({ data: "storage delete" });
})

export default StorageRouter;