import { ICheck } from "./check.entity";
import { Schema, model } from "mongoose";

const checkSchema = new Schema<ICheck>({
  name: { type: String, required: true },
  url: { type: String, required: true },
  protocol: { type: String, enum: ["HTTP", "HTTPS", "TCP"], default: "HTTP" },
  path: { type: String },
  port: { type: Number },
  timeout: { type: Number, default: 5 * 1000 },
  interval: { type: Number, default: 10 * 1000 },
  webhook: { type: String },
  headers: [{ key: String, value: String }],
  authentication: { username: String, password: String },
  tags: Array<String>,
  ignoreSSL: Boolean,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

checkSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
checkSchema.set("toJSON", { virtuals: true, versionKey: false });

const Check = model<ICheck>("Check", checkSchema);

export default Check;
