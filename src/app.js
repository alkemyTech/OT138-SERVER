import http from "http";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import db from "./models";
dotenv.config();

const app = express();
const server = http.createServer(app);
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

app.use("/", (_, res) => {
  res.json({ working: true });
});

server.listen(process.env.PORT || 4000, async () => {
  console.log(`Server on http://localhost:${process.env.PORT || 4000}`);
});
