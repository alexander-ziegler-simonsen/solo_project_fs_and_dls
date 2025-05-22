import express from "express";

import ItemRouter from "./Routes/ItemRouter";
import ItemGroupRouter from "./Routes/ItemGroupRouter";
import UserRouter from "./Routes/UserRouter";
import StorageRouter from "./Routes/StorageRouter";
import OrderItemRouter from "./Routes/OrderItemRouter";
import OrderRouter from "./Routes/OrderRouter";

const app = express();
app.use(express.json());

app.use(ItemRouter);
app.use(UserRouter);
app.use(StorageRouter);
app.use(OrderItemRouter);
app.use(OrderRouter);
app.use(ItemGroupRouter);

// login  -----------------------------------

app.post("/login", (req, res) => {
    res.send({ data: "this is data" })
})

// the last part of the server -----------------------------

const PORT = Number(process.env.PORT) || 8080; 
app.listen(PORT, () => console.log("server is running on port", PORT)) ;

