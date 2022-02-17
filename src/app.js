import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { ValidationError } from "express-validation";
dotenv.config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
export const app = express();
const server = http.createServer(app);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Alkemy ONG",
      version: "1.0.0",
    },
  },
  apis: ["src/routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api", routes);
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json(err);
  }

  return res.status(500).json(err);
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", (_, res) => {
  res.json({ working: true });
});

server.listen(process.env.PORT || 4000, async () => {
  console.log(`Server on http://localhost:${process.env.PORT || 4000}`);
});
