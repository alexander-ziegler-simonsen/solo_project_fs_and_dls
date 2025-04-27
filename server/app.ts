import express from "express";

const app = express();


app.get("/items", (req, res) => {
    res.send({ data: "this is the data from express" });
});


const PORT = Number(process.env.PORT) || 8080; 
app.listen(PORT, () => console.log("server is running on port", PORT)) ;

