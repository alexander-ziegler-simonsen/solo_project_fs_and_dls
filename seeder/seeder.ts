import mongoose from "mongoose"
import 'dotenv/config'
import * as fs from 'fs'

const mongodbUrl = process.env.DATABASE_URL

// some test data
const rawProducts = fs.readFileSync("./data/Products.json", "utf-8")
const ProductData = JSON.parse(rawProducts)

// the schema that is build like our data 
// (without id, since mongodb generates those on its own)
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    info: String,
    description: String,
    image: String
})

// mongoose compiles a model, based on our schema
//                              "product", schema, collection name
const product = mongoose.model("product", productSchema, "products");


// TODO - rewrite this code, so it looks better

// delete every product first
mongoose.connect(mongodbUrl) // connection to mongodb
.then(() => {
    // delete every product first
    product.deleteMany({}) // if there is a empty {} in delete many, it will delete the whole table
    .then(() => {
        console.log("all existing products was deleted")

        mongoose.connect(mongodbUrl) // connection to mongodb
        .then(() => {
            // save all the products to the db
            product.insertMany(ProductData).then(() => {
                console.log("all products added")
            }).catch((err) => {
                console.log(err)
            })

        })
        .catch((err) => {
            console.log(err);
        })
    })
.catch((err) => {
    console.log(err)
})
        
    })
    .catch((err) => {
        console.log(err);
    })


