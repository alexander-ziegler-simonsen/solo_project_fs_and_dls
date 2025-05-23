import { Router } from "express";

import {Order, Order_post} from "../entities/Order";

const OrderRouter = Router();

// mongo
OrderRouter.get("/order", async (req, res) => {
    const response = await console.log("order get");
    res.send({ data: "order get" })
})

OrderRouter.get("/order:id", async (req, res) => {
    const response = await console.log("order get by id");
    res.send({ data: "order get by id" });
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