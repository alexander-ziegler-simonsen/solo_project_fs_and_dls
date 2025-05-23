import { Router } from "express";

import {User, User_post} from "../entities/User";

const UserRouter = Router();

// mongo
UserRouter.get("/user", async (req, res) => {
    const response = await console.log("user get");
    res.send("all user data");
})

UserRouter.get("/user:id", async (req, res) => {
    const response = await console.log("user get by id");
    res.send("one user data");
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