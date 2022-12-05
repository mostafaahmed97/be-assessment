import { Types } from "mongoose";

export interface IToken {
  id: string;
  hash: string;
  userId: Types.ObjectId;
}
