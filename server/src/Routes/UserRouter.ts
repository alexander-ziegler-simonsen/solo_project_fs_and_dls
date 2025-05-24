import { Router } from "express";

import {User, User_post} from "../entities/User";
import { PostgresDataSource, MongodbDataSource } from "../DataSources";

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
    const response = await console.log("user added");
    res.send("user added");
})

UserRouter.put("/user", async (req, res) => {
    const response = await console.log("user update");
    res.send("user updated");
})

UserRouter.delete("/user", async (req, res) => {
    const response = await console.log("user delete");
    res.send("user deleted");
})

export default UserRouter;