import config from "../config";
import mongoose from "mongoose";

// mongoose.plugin((schema) => {
//   schema.set("toJSON", {
//     virtuals: true,
//     versionKey: false,
//     transform(doc, ret) {
//       ret.id = doc._id;
//       delete ret._id;
//     },
//   });
// });

async function connectToDB() {
  await mongoose.connect(config.db.uri);
  console.log("DB Connection Established");
}

export default connectToDB;
