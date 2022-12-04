import Report from "./report.model";
import Check from "../check/check.model";
import { IReport } from "./report.entity";
import { Types } from "mongoose";

class ReportService {
  async get(userId: string): Promise<IReport[]> {
    const reports = await Report.find({ userId: userId }).exec();
    return reports;
  }

  async getOne(userId: string, reportId: string): Promise<IReport> {
    const report = await this.retrieveIfOwned(userId, reportId);
    return report;
  }

  async getByTag(userId: string, tag: string): Promise<IReport[] | []> {
    console.log("Checks");

    const checksWithTag = await Check.find({
      userId: new Types.ObjectId(userId),
      tags: { $in: [tag] },
    }).exec();

    console.log(checksWithTag);

    if (!checksWithTag.length) return [];

    const checkIds = checksWithTag.map((c) => c.id);
    console.log(checkIds);

    const reports = await Report.find({
      id: { $in: checkIds },
    }).exec();
    return reports;
  }

  private async retrieveIfOwned(userId: string, reportId: string) {
    const report = await Report.findById(reportId).exec();
    if (!report) throw { code: 404 };
    if (report.userId.toHexString() != userId) throw { code: 403 };
    return report;
  }
}

export const reportSvc = new ReportService();
