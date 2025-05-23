import { Router } from "express";

//import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import { Item, Item_post } from "../entities/Item";

const ItemRouter = Router();

//const temp = new ItemGroup();

// mongo
ItemRouter.get("/item", async (req, res) => {
    const response = await console.log("item get");
    res.send({ data: "item get" })
})

ItemRouter.get("/item:id", async (req, res) => {
    const response = await console.log("item get by id");
    res.send({ data: "item get by id" });
})

// postgres
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