const { PrismaClient } = require("@prisma/client");
const conn = new PrismaClient();
require("dotenv").config();
const CookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");
const multer = require("multer");
const express = require("express");
const cors = require("cors");
const routerAuth = require("./route/index");
const errorMid = require("./middlewares/errormid");
const winston = require("winston");
const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });
app.use(express.json());
app.use(CookieParser());
app.use(
  cors({
    credentials: true,
    origin: "https://dreamcinema:3000",
  })
);
app.use("/api", upload.single("image"), routerAuth);
app.use(errorMid);
const start = async () => {
  try {
    const allusers = await conn.users.findMany();
    console.log(allusers);
    app.listen(process.env.PORT, () =>
      console.log(`Listening to http://localhost:${process.env.PORT}/`)
    );
  } catch (error) {
    console.log(error);
  }
};
//start();
const logger = winston.createLogger({
  level: "info", // Уровень логирования
  format: winston.format.json(), // Формат вывода логов
  transports: [
    new winston.transports.File({ filename: "log.txt" }), // Транспорт для записи в файл
  ],
});
let options = {
  key: fs.readFileSync("./SSL/dreamcinema-key.pem").toString(),
  cert: fs.readFileSync("./SSL/dreamcinema.pem").toString(),
};

const startHttps = async () => {
  try {
    https.createServer(options, app).listen(
      {
        port: process.env.PORT,
      },
      () => {
        console.log(
          `Server started on https://dreamcinema:${process.env.PORT}/`
        );
        console.log(
          `Server started on https://dreamcinema.by:${process.env.PORT}/`
        );
      }
    );
  } catch (e) {
    console.log(e.message);
  }
};

startHttps();
