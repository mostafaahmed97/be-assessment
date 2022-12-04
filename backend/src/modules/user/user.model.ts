import { IBaseUser } from "./user.interface";
import { Schema, model } from "mongoose";

const userSchema = new Schema<IBaseUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});
userSchema.set("toJSON", { virtuals: true, versionKey: false });

const User = model<IBaseUser>("User", userSchema);

export default User;
