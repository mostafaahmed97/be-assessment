import config from "../config";
import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(config.db.uri);
  console.log("DB Connection Established");
}

async function disconnect() {
  await mongoose.disconnect();
}

export { connect, disconnect };
