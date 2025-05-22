import { Router } from "express";

import Storage from "../entities/Storage";

const StorageRouter = Router();

StorageRouter.get("/storage", async (req, res) => {
    const response = await console.log("storage get");
    res.send({ data: "storage get" })
})

StorageRouter.get("/storage:id", async (req, res) => {
    const response = await console.log("storage get by id");
    res.send({ data: "storage get by id" });
})

StorageRouter.post("/storage", async (req, res) => {
    const response = await console.log("storage post");
    res.send({ data: "storage added" });
})

StorageRouter.put("/storage", async (req, res) => {
    const response = await console.log("storage updated");
    res.send({ data: "storage updated" });
})

StorageRouter.delete("/storage", async (req, res) => {
    const response = await console.log("storage delete");
    res.send({ data: "storage delete" });
})

export default StorageRouter;