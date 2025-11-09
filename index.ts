import express, { type Request, type Response } from "express";
import cors from "cors";
import swigger from 'swagger-ui-express';
import YAML from "yamljs";
import errorMiddleware from "./middleware/error.middleware.ts";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(express.json());

// documentation
const swiggerDocs = YAML.load("./doc/document.yml")
app.use("/docs", swigger.serve, swigger.setup(swiggerDocs))

// test api
app.get("/", (req:Request, res:Response) => {
  res.status(200).send(`<h1>hello world</h1>`)
})

// Error Handler
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`document http://localhost:${PORT}/docs`);
  console.log(`server http://localhost:${PORT}/`);
});
