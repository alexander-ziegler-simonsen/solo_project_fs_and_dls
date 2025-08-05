import { Router } from "express";

import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import { Item, Item_post } from "../entities/Item";

import RabbitMQHelper from "../Helpers/RabbitMqHelper";
import { getResultsHandler, searchHandler } from "../services/Item.service";

const ItemRouter = Router();
const itemRespository = MongodbDataSource.getMongoRepository(Item);

// mongo
// TODO - change this to use search parms (get all item is insane)
// ItemRouter.get("/item", async (req, res, next) => {
//     try {
//         let output = await itemRespository.find();

//         res.send({ data: output })
//     }
//     catch (err) {
//         next(err);
//     }
// })


ItemRouter.get("/item", getResultsHandler);

ItemRouter.get("/item/:id", async (req, res) => {

    let itemId = req.params.id;
    let output = await itemRespository.findOneBy({ id: itemId });

    res.send({ data: output });
})

// postgres
ItemRouter.post("/item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("posts", "post", "item", req.body);
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

ItemRouter.put("/item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("updates", "put", "item", req.body);
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

ItemRouter.delete("/item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("deletes", "delete", "item", req.body);
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

ItemRouter.post("/item_search/", searchHandler);
export default ItemRouter;