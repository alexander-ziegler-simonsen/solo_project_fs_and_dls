import { Router } from "express";

import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import { Item, Item_post } from "../entities/Item";

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
    const response = await console.log("item post");
    res.send({ data: "item added" });
})

ItemRouter.put("/item", async (req, res) => {
    const response = await console.log("item updated");
    res.send({ data: "item updated" });
})

ItemRouter.delete("/item", async (req, res) => {
    const response = await console.log("item delete");
    res.send({ data: "item delete" });
})

export default ItemRouter;