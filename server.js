const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

mongoose.connect(
  "mongodb://127.0.0.1/react-shopping-cart-db",
  {
    //useNewUrlParser: true,
    //useCreateIndex: true,
    // useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB!!!");
  }
);


const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate },
    title: String,
    author: String,
    isbn: String,
    status: String,
    image: String,
    description: String,
    price: Number,
    availableSizes: [String],
  })
);

app.get("/api/products", async (req, res) =>{
    const products = await Product.find({});
    res.send(products);
});

app.post("/api/products", async (req, res)=>{
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
  const deletedProduct = await Product.findByIdAndDelete(req.params.id)    ;
  res.send(deletedProduct);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));

