import { Router } from "express";

import {User, User_post} from "../entities/User";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const UserRouter = Router();
const UserRespository = MongodbDataSource.getMongoRepository(User);

// mongo
UserRouter.get("/user", async (req, res) => {
    let output = await UserRespository.find();

    res.send({ data: output });
})

UserRouter.get("/user/:id", async (req, res) => {
    let UserId = req.params.id;
    let output = await UserRespository.findOneBy({id: UserId});

    res.send({ data: output });
})

// postgres
UserRouter.post("/user", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("posts", "post", "user", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

UserRouter.put("/user", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("updates", "put", "user", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

UserRouter.delete("/user", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    let response = rabbitHelper.handlePostToChannel("deletes", "delete", "user", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default UserRouter;