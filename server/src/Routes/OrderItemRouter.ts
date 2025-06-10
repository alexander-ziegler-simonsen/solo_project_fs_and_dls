import { Router } from "express";

import {OrderItem, OrderItem_post} from "../entities/OrderItem";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";

import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const OrderItemRouter = Router();
const orderItemRespository = MongodbDataSource.getMongoRepository(OrderItem);

// mongo
OrderItemRouter.get("/order_item", async (req, res) => {

    let output = await orderItemRespository.find();

    res.send({ data: output });
})

OrderItemRouter.get("/order_item/:id", async (req, res) => {

    let orderItemId = req.params.id;
    let output = await orderItemRespository.findOneBy({id: orderItemId});

    res.send({ data: output });
})

// postgresorder_item
OrderItemRouter.post("/order_item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("posts", "post", "order_item", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

OrderItemRouter.put("/order_item", async (req, res) => {

    const rabbitHelper = new RabbitMQHelper();
    let response = await rabbitHelper.handlePostToChannel("updates", "put", "order_item", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

OrderItemRouter.delete("/order_item", async (req, res) => {
    const rabbitHelper = new RabbitMQHelper();

    let response = await rabbitHelper.handlePostToChannel("deletes", "delete", "order_item", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default OrderItemRouter;