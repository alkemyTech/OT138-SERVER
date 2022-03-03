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
    origin: process.env.FRONTEND_URL
      ? Array.from(process.env.FRONTEND_URL.split(","))
      : "http://localhost:3000",
  })
);

app.use(logger("dev"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api", routes);
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: true, err });
  }

  return res.status(500).json({ error: true, err });
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use("/", (_, res) => {
  res.json({
    name: "AlkemyONG API",
    version: "v0.1",
    group: "Grupo 138 Alkemy",
    state: `Uptime ${parseInt(process.uptime())} seconds`,
  });
});

console.log(process.env.NODE_ENV);

server.listen(process.env.PORT || 4000, async () => {
  console.log(`Server on http://localhost:${process.env.PORT || 4000}`);
});
