import { Router } from "express";

import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import { ItemGroup, ItemGroup_post } from "../entities/ItemGroup";

const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost:5173";

import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const ItemGroupRouter = Router();
const ItemGroupRespository = MongodbDataSource.getMongoRepository(ItemGroup);

// mongo
ItemGroupRouter.get("/item_group", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let output = await ItemGroupRespository.find();

    res.send({ data: output });
})

ItemGroupRouter.get("/item_group/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let ItemGroupId = req.params.id;
    let output = await ItemGroupRespository.findOneBy({id: ItemGroupId});

    res.send({ data: output });
})

// postgres
ItemGroupRouter.post("/item_group", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("posts", "post", "item_group", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

ItemGroupRouter.put("/item_group", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("updates", "put", "item_group", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

ItemGroupRouter.delete("/item_group", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("deletes", "delete", "item_group", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default ItemGroupRouter;