import { Router } from "express";

import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import { Item, Item_post } from "../entities/Item";

import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const ItemRouter = Router();
const itemRespository = MongodbDataSource.getMongoRepository(Item);

// mongo
// TODO - change this to use search parms (get all item is insane)
ItemRouter.get("/item", async (req, res) => {
    let output = await itemRespository.find();

    res.send({ data: output })
})

ItemRouter.get("/item/:id", async (req, res) => {

    let itemId = req.params.id;
    let output = await itemRespository.findOneBy({id: itemId});

    res.send({ data: output });
})

// postgres
ItemRouter.post("/item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("posts", "post", "item", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

ItemRouter.put("/item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("updates", "put", "item", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

ItemRouter.delete("/item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("deletes", "delete", "item", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default ItemRouter;