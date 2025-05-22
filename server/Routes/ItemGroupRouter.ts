import { Router } from "express";

import Item from "../entities/Item";

const ItemGroupRouter = Router();

ItemGroupRouter.get("/item_group", async (req, res) => {
    const response = await console.log("item_group get");
    res.send({ data: "item_group get" })
})

ItemGroupRouter.get("/item_group:id", async (req, res) => {
    const response = await console.log("item_group get by id");
    res.send({ data: "item_group get by id" });
})

ItemGroupRouter.post("/item_group", async (req, res) => {
    const response = await console.log("item_group post");
    res.send({ data: "item_group added" });
})

ItemGroupRouter.put("/item_group", async (req, res) => {
    const response = await console.log("item_group updated");
    res.send({ data: "item_group updated" });
})

ItemGroupRouter.delete("/item_group", async (req, res) => {
    const response = await console.log("item_group delete");
    res.send({ data: "item_group delete" });
})

export default ItemGroupRouter;