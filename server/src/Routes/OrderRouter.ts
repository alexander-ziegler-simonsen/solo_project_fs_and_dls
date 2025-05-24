import { Router } from "express";

import { Order, Order_post } from "../entities/Order";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";

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
    const response = await console.log("order post");
    res.send({ data: "order added" });
})

OrderRouter.put("/order", async (req, res) => {
    const response = await console.log("order updated");
    res.send({ data: "order updated" });
})

OrderRouter.delete("/order", async (req, res) => {
    const response = await console.log("order delete");
    res.send({ data: "order delete" });
})

export default OrderRouter;