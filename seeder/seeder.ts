//import dotenv from "dotenv"
import mongoose from "mongoose"
import 'dotenv/config'

const mongodbUrl = process.env.DATABASE_URL

mongoose
    .connect(mongodbUrl)
    .then(() => {
        console.log("database is connected")
    })
    .catch((err) => {
        console.log(err);
    })