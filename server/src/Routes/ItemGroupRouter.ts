import { Router } from "express";

import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import { ItemGroup, ItemGroup_post } from "../entities/ItemGroup";

const ItemGroupRouter = Router();
const ItemGroupRespository = MongodbDataSource.getMongoRepository(ItemGroup);


// mongo
ItemGroupRouter.get("/item_group", async (req, res) => {
    let output = await ItemGroupRespository.find();

    res.send({ data: output });
})

ItemGroupRouter.get("/item_group/:id", async (req, res) => {
    let ItemGroupId = req.params.id;
    let output = await ItemGroupRespository.findOneBy({id: ItemGroupId});

    res.send({ data: output });
})

// postgres
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