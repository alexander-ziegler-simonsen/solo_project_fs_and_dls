import { Router, Request, Response } from 'express';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { MongodbDataSource } from "../DataSources";
import { User } from "../entities/User";

const LoginRouter = Router();
const UserRespository = MongodbDataSource.getMongoRepository(User);

// mongo
LoginRouter.post("/", async (req: Request, res: Response): Promise<void> => {

    const { username, password } = req.body;
    
    // problems with the input, fail
    if (!username || !password) { 
        res.status(400).json({ message: 'username and password required' });
        return;
    }

    // query mongo
    const user = await UserRespository.findOne({ where: {username} })
    
    // could not find the user (by username), fail
    if (!user) {
         res.status(401).json({ message: "invalid credentials username" });
         return;
    }
    
    // TODO - this is just under dev, remove this part before going to prod
    // the passwords needs to be stored this way first, for this code to work, so this is a small hack for now
    const saltRounds = 10;
    const passwordHashed = await bcrypt.hash(user.password, saltRounds)

    const match = await bcrypt.compare(password, passwordHashed);
    if (!match) {
        res.status(401).json({ message: "invalid credentials password" });
        return;
    }

    // JWT (only in memory, not saved anywhere)
    const token = jwt.sign(
        { sub: user._id.toString(), username: user.username },
        process.env.JWT_SECRET || 'super-secret',
        { expiresIn: '1h' }
    )

    res.json({token})
}
)

export default LoginRouter;