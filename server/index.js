require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const subcategoryRoutes = require("./routes/subsategories");

const app = express();
app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api", categoryRoutes, subcategoryRoutes, productRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Im listening port 4000");
        });
    })
    .catch(() => {
        console.log("error server could not start");
    });
