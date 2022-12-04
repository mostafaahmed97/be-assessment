import Check from "./check.model";
import Report from "../report/report.model";
import { Types } from "mongoose";
import { IBaseCheck, ICheck } from "./check.entity";
import { pollingSvc } from "../polling/polling.service";

class CheckService {
  async create(data: IBaseCheck, userId: string): Promise<ICheck> {
    const newCheck = new Check(data);

    const userIdRef = new Types.ObjectId(userId);
    newCheck.userId = userIdRef;
    await newCheck.save();
    // const report = new Report();
    // report.userId = userIdRef;
    // report.checkId = newCheck.id;
    // await report.save();

    pollingSvc.startCheck(newCheck.id);
    return newCheck;
  }
}

export const checkSvc = new CheckService();
