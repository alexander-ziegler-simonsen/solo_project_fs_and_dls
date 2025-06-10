import { Router } from "express";

import { Order, Order_post } from "../entities/Order";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";

import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const OrderRouter = Router();
const orderRespository = MongodbDataSource.getMongoRepository(Order);

// mongo
OrderRouter.get("/order", async (req, res) => {

    let output = await orderRespository.find();

    res.send({ data: output });
})

OrderRouter.get("/order/:id", async (req, res) => {

    let orderId = req.params.id;
    let output = await orderRespository.findOneBy({id: orderId});

    res.send({ data: output });
})

// postgres
OrderRouter.post("/order", async (req, res) => {
    const rabbitHelper = new RabbitMQHelper();

    let response = rabbitHelper.handlePostToChannel("posts", "post", "order", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

OrderRouter.put("/order", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();

    let response = rabbitHelper.handlePostToChannel("updates", "put", "order", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

OrderRouter.delete("/order", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();

    let response = rabbitHelper.handlePostToChannel("deletes", "delete", "order", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default OrderRouter;