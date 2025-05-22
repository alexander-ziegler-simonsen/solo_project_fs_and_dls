import { Router } from "express";

import OrderItem from "../entities/OrderItem";

const OrderItemRouter = Router();

// mongo
OrderItemRouter.get("/order_item", async (req, res) => {
    const response = await console.log("order item get");
    res.send({ data: "order item get" })
})

OrderItemRouter.get("/order_item:id", async (req, res) => {
    const response = await console.log("order item get by id");
    res.send({ data: "order_item get by id" });
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