import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
// middlewar
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

//database

import "./config/database";
import routes from "./routes";
// routes

app.use("/api", routes.authRouter);
// server

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`server start port ${PORT}`);
});
