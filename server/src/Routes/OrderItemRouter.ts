import { Router } from "express";

import {OrderItem, OrderItem_post} from "../entities/OrderItem";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";

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

// postgres
OrderItemRouter.post("/order_item", async (req, res) => {
    const response = await console.log("order item post");
    res.send({ data: "order_item added" });
})

OrderItemRouter.put("/order_item", async (req, res) => {
    const response = await console.log("order_item updated");
    res.send({ data: "order_item updated" });
})

OrderItemRouter.delete("/order_item", async (req, res) => {
    const response = await console.log("order_item delete");
    res.send({ data: "order_item delete" });
})

export default OrderItemRouter;