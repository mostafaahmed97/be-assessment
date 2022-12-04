import Check from "./check.model";
import Report from "../report/report.model";
import { Types } from "mongoose";
import { IBaseCheck, ICheck } from "./check.entity";
import { pollingSvc } from "../polling/polling.service";

class CheckService {
  async get(userId: string): Promise<ICheck[]> {
    const checks = await Check.find({ userId: userId }).exec();
    return checks;
  }

  async getOne(userId: string, checkId: string): Promise<ICheck> {
    const check = await this.retrieveIfOwned(userId, checkId);
    return check;
  }

  async create(data: IBaseCheck, userId: string): Promise<ICheck> {
    const newCheck = new Check(data);

    const userIdRef = new Types.ObjectId(userId);
    newCheck.userId = userIdRef;
    await newCheck.save();
    pollingSvc.startCheck(newCheck.id);
    return newCheck;
  }

  async update(
    userId: string,
    checkId: string,
    data: IBaseCheck
  ): Promise<ICheck> {
    const check = await this.retrieveIfOwned(userId, checkId);
    const updatedCheck = await Check.findOneAndUpdate({ id: check.id }, data, {
      new: true,
    });

    pollingSvc.startCheck(check.id);
    return updatedCheck!;
  }

  async delete(userId: string, checkId: string) {
    const check = await this.retrieveIfOwned(userId, checkId);
    await Promise.all([
      check.delete(),
      Report.deleteOne({ checkId: check.id }),
    ]);
    pollingSvc.stopCheck(checkId);
    return;
  }

  private async retrieveIfOwned(userId: string, checkId: string) {
    const check = await Check.findById(checkId).exec();
    if (!check) throw { code: 404 };
    if (check.userId.toHexString() != userId) throw { code: 403 };
    return check;
  }
}

export const checkSvc = new CheckService();
