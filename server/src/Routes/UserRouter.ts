import { Router } from "express";

import {User, User_post} from "../entities/User";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";
import RabbitMQHelper from "../Helpers/RabbitMqHelper";

const UserRouter = Router();
const UserRespository = MongodbDataSource.getMongoRepository(User);

const CLIENT_HOST = process.env.CLIENT_HOST || "http://localhost:5173";

// mongo
UserRouter.get("/user", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let output = await UserRespository.find();

    res.send({ data: output });
})

UserRouter.get("/user/:id", async (req, res) => {
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let UserId = req.params.id;
    let output = await UserRespository.findOneBy({id: UserId});

    res.send({ data: output });
})

// postgres
UserRouter.post("/user", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let response = rabbitHelper.handlePostToChannel("posts", "post", "user", req.body );
    response ? res.status(200).send("data queued for creation") : res.status(500).send("something went wrong");
})

UserRouter.put("/user", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let response = rabbitHelper.handlePostToChannel("updates", "put", "user", req.body );
    response ? res.status(200).send("data queued for update") : res.status(500).send("something went wrong");
})

UserRouter.delete("/user", async (req, res) => {
const rabbitHelper = new RabbitMQHelper();
    res.header("Access-Control-Allow-Origin", CLIENT_HOST);
    res.header("Access-Control-Allow-Headers", "origin, X-Requested-With, Content-Type");
    let response = rabbitHelper.handlePostToChannel("deletes", "delete", "user", req.body );
    response ? res.status(200).send("data queued for deletion") : res.status(500).send("something went wrong");
})

export default UserRouter;