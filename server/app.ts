import express from "express";

const app = express();

// product -----------------------------------

app.get("/item", (req, res) => {
    res.send({ data: "this is data" })
})

app.post("/item", (req, res) => {
    res.send({ data: "this is data" })
})

app.put("/item", (req, res) => {
    res.send({ data: "this is data" })
})

app.delete("/item", (req, res) => {
    res.send({ data: "this is data" })
})

// product_group  -----------------------------------

app.get("/item_group", (req, res) => {
    res.send({ data: "this is data" })
})

app.post("/item_group", (req, res) => {
    res.send({ data: "this is data" })
})

app.put("/item_group", (req, res) => {
    res.send({ data: "this is data" })
})

app.delete("/item_group", (req, res) => {
    res.send({ data: "this is data" })
})

// storage  -----------------------------------


app.get("/storage", (req, res) => {
    res.send({ data: "this is data" })
})

app.post("/storage", (req, res) => {
    res.send({ data: "this is data" })
})

app.put("/storage", (req, res) => {
    res.send({ data: "this is data" })
})

app.delete("/storage", (req, res) => {
    res.send({ data: "this is data" })
})

// user (+ login)  -----------------------------------

app.post("/login", (req, res) => {
    res.send({ data: "this is data" })
})

app.get("/user", (req, res) => {
    res.send({ data: "this is data" })
})

app.post("/user", (req, res) => {
    res.send({ data: "this is data" })
})

app.put("/user", (req, res) => {
    res.send({ data: "this is data" })
})

app.delete("/user", (req, res) => {
    res.send({ data: "this is data" })
})

// the last part of the server -----------------------------

const PORT = Number(process.env.PORT) || 8080; 
app.listen(PORT, () => console.log("server is running on port", PORT)) ;

