import * as dotenv from "dotenv";
import path from "path";

const backendPath = path.join(__dirname, "../..");
const dotenvPath = path.join(backendPath, "./.env");

dotenv.config({
  path: dotenvPath,
});

const config = {
  port: process.env.PORT || "3000",
  baseDir: backendPath,
  jwt: {
    secret: "bosta",
    duration: "1d",
  },
  db: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/urlmonitor",
  },
  mailer: {
    service: "gmail",
    host: "smtp.gmail.com",
    user: "addemailhere@test.com",
    pass: "yourpassword",
  },
};

export default config;
