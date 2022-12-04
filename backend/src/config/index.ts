import * as dotenv from "dotenv";
import path from "path";

const backendPath = path.join(__dirname, "../..");
const dotenvPath = path.join(backendPath, "./.env");

dotenv.config({
  path: dotenvPath,
});

const config = {
  port: process.env.PORT,
  baseDir: backendPath,
  jwt: {
    secret: "bosta",
    duration: "1d",
  },
  db: {
    uri: "mongodb://localhost:27017/urlmonitor",
  },
  mailer: {
    service: "gmail",
    host: "smtp.gmail.com",
    user: "signupemail450@gmail.com",
    pass: "@dventure123",
  },
};

export default config;
