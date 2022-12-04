import { Types } from "mongoose";

export interface IBaseReport {
  status: "up" | "down";
  availability: number;
  outages: number;
  downtime: number;
  uptime: number;
  responseTime: number;
  history: Array<number>;
}

export interface IReport extends IBaseReport {
  id: string;
  checkId: Types.ObjectId;
  userId: Types.ObjectId;
}
