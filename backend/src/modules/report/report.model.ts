import { IReport } from "./report.entity";
import { model, Schema } from "mongoose";

const reportSchema = new Schema<IReport>({
  status: { type: String, enum: ["up", "down"] },
  availability: { type: Number, default: 0 },
  outages: { type: Number, default: 0 },
  downtime: { type: Number, default: 0 },
  uptime: { type: Number, default: 0 },
  responseTime: { type: Number, default: 0 },
  history: Array<Number>,
  checkId: { type: Schema.Types.ObjectId, ref: "Check" },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

reportSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
reportSchema.set("toJSON", { virtuals: true, versionKey: false });

const Report = model<IReport>("Report", reportSchema);

export default Report;
