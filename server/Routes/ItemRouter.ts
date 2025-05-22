import { Router } from "express";

import ItemGroup from "../entities/ItemGroup";

const ItemRouter = Router();

ItemRouter.get("/item", async (req, res) => {
    const response = await console.log("item get");
    res.send({ data: "item get" })
})

ItemRouter.get("/item:id", async (req, res) => {
    const response = await console.log("item get by id");
    res.send({ data: "item get by id" });
})

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