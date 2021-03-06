import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { ValidationError } from "express-validation";
import fileStorageMiddleware from "./middlewares/fileStorage.middleware";

dotenv.config();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
export const app = express();
const server = http.createServer(app);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Somos Más ONG",
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

if (process.env.NODE_ENV !== "test") {
  app.use(logger("dev"));
}
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cookieParser());

// Use middleware to store images
// app.use(fileStorageMiddleware("image"));

app.use("/api", routes);
app.use(function (err, req, res, next) {
  if (err instanceof ValidationError) {
    return res.status(err.statusCode).json({ error: true, err });
  }

  return res.status(500).json({ error: true, err });
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.get("/", (_, res) => {
  res.json({
    name: "AlkemyONG API",
    version: "v0.1",
    group: "Grupo 138 Alkemy",
    state: `Uptime ${parseInt(process.uptime())} seconds`,
  });
});

//serve static files (uploaded images)
app.use("/uploads", express.static("uploads"));

// If no route was matched return not found
app.use("*", function (req, res) {
  res.status(404).json({
    error: true,
    errorCode: "REQ001",
    status: "404",
    message: "Not found.",
  });
});

// Do not run server on test environment
if (process.env.NODE_ENV !== "test") {
  server.listen(process.env.PORT || 4000, async () => {
    console.log(`Server on http://localhost:${process.env.PORT || 4000}`);
  });
}

module.exports = app;
