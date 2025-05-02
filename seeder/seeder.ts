import mongoose from "mongoose"
import 'dotenv/config'

const mongodbUrl = process.env.DATABASE_URL



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
// it gets the name "product", which later will be the name of the collection 
// (mongodb adds "s" to the end of the name)
const product = mongoose.model("product", productSchema);

// some test data
const productTest = new product({
    name: "Wireless Mouse",
    price: 25.99,
    info: "2.4GHz wireless connectivity",
    description: "A sleek, ergonomic mouse with adjustable DPI settings and long battery life.",
    image: "https://example.com/images/mouse1.jpg"
})


mongoose.connect(mongodbUrl) // connection to mongodb
    .then(() => {
        productTest.save() // save the product to the db
    })
    .catch((err) => {
        console.log(err);
    })