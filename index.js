const express = require("express");
const cors = require("cors");
const connentDB = require("./config/connentDB");
const swigger = require('swagger-ui-express')
const YAML = require("yamljs");
const authRouter = require("./router/auth.routes");
const errorMiddleware = require("./middleware/error.middleware");
const cookieParser = require("cookie-parser");
const CarsRouter = require("./router/cars.routes");
const categoriesRouter = require("./router/categories.routes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());

// DB connected
connentDB()

// documentation
const swiggerDocs = YAML.load("./doc/document.yml")
app.use("/docs", swigger.serve, swigger.setup(swiggerDocs))

// test api
app.get("/", (req, res) => {
  res.status(200).send(`<h1>hello world</h1>`)
})

// Routers
app.use(authRouter)
app.use(CarsRouter)
app.use(categoriesRouter)


// Error Handler
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`document http://localhost:${PORT}/docs`);
  console.log(`server http://localhost:${PORT}/`);
});
