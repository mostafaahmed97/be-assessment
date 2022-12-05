import config from "../config";
import mongoose from "mongoose";

async function connect() {
  console.log("Establishing connection to DB..");
  await mongoose.connect(config.db.uri);
  console.log("DB Connection Established!");
}

async function disconnect() {
  await mongoose.disconnect();
}

export { connect, disconnect };
