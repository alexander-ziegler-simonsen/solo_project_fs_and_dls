import { Router } from "express";

import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import { ItemGroup, ItemGroup_post } from "../entities/ItemGroup";

import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const ItemGroupRouter = Router();
const ItemGroupRespository = MongodbDataSource.getMongoRepository(ItemGroup);

// mongo
ItemGroupRouter.get("/item_group", async (req, res) => {

    let output = await ItemGroupRespository.find();

    res.send({ data: output });
})

ItemGroupRouter.get("/item_group/:id", async (req, res) => {

    let ItemGroupId = req.params.id;
    let output = await ItemGroupRespository.findOneBy({id: ItemGroupId});

    res.send({ data: output });
})

// postgres
ItemGroupRouter.post("/item_group", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("posts", "post", "item_group", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

ItemGroupRouter.put("/item_group", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("updates", "put", "item_group", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

ItemGroupRouter.delete("/item_group", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("deletes", "delete", "item_group", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default ItemGroupRouter;