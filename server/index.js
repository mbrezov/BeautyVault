require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const productRoutes = require("./routes/products");
const categoryRoutes = require("./routes/categories");
const subcategoryRoutes = require("./routes/subsategories");

// enables cors for the specific URL
app.use(
    cors({
        origin: `${process.env.CORS_URL}`,
    })
);

app.use(express.json()); // adds middleware to parse incoming JSON requests. It enables the server to handle JSON data in the request body.

//middleware to log requests and responses. Due to that middleware we get in console "/api/categories GET" when we fetch categories
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// adds routes to the main routte "/api", for example, for the categoryRoutes it adds "/categories", "/category/:id" to the "/api" path
app.use("/api", categoryRoutes, subcategoryRoutes, productRoutes);

//connects to the database
mongoose
    .connect(process.env.MONGO_URI) //uses mongouri to connect to the database
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Im listening port ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log("error server could not start", error);
    });
