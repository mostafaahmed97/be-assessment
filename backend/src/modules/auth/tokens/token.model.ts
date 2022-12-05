import { Schema, model } from "mongoose";
import { IToken } from "./token.entity";

const tokenSchema = new Schema<IToken>({
  hash: String,
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

const Token = model<IToken>("Token", tokenSchema);

export default Token;
