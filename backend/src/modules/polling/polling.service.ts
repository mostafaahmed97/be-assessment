import Check from "../check/check.model";
import Report from "../report/report.model";
import { ICheck } from "../check/check.entity";

import axios, { AxiosRequestConfig } from "axios";
import { axiosInstance } from "../../utilities/axios";
import { IBaseReport } from "../report/report.entity";

import url from "node:url";
import { Types } from "mongoose";

class PollingService {
  private static activeChecks: { [checkId: string]: NodeJS.Timer } = {};

  // Starts checks for stored urls on db
  // when server starts
  async bootstrap() {
    const checks = await Check.find({}, "_id");
    for (let check of checks) this.startCheck(check.id);
  }

  async startCheck(checkId: string) {
    console.log("Starting new check for ID", checkId);
    try {
      const check = await Check.findById(checkId);
      if (!check) throw { code: 500 };

      const pollingIntervalId = this.generatePollingInterval(check);

      if (checkId in PollingService.activeChecks)
        clearInterval(PollingService.activeChecks[checkId]);

      PollingService.activeChecks[checkId] = await pollingIntervalId;
    } catch (error) {
      console.log("Error while starting the check");
      console.log(error);
    }
  }

  async stopCheck(checkId: string) {
    if (checkId in PollingService.activeChecks)
      clearInterval(PollingService.activeChecks[checkId]);
  }

  private buildUrl(check: ICheck): string {
    let url = `${check.protocol}://${check.url}`;
    if (check.port) url += `:${check.port}`;
    console.log(url);
    return url;
  }

  private buildRequestConfig(check: ICheck) {
    const requestConfig: AxiosRequestConfig = {
      baseURL: check.url,
      url: check.path || "",
      headers: {},
      timeout: check.timeout,
    };

    if (check.headers)
      check.headers.forEach((h) => (requestConfig.headers![h.key] = h.value));

    return requestConfig;
  }

  private async generatePollingInterval(check: ICheck) {
    const requestUrl = this.buildUrl(check);
    const requestConfig = this.buildRequestConfig(check);

    let report = await Report.findOne({ checkId: check.id }).exec();

    if (!report) {
      report = new Report();
      report.userId = check.userId;
      report.checkId = new Types.ObjectId(check.id);
      await report.save();
    }

    const intervalId = setInterval(async function () {
      const timestamp = Date.now();
      let status = "";
      let uptime = 0;
      let downtime = 0;
      let outages = 0;
      let responseTime = 0;

      try {
        const { headers } = await axiosInstance.get(requestUrl, requestConfig);
        responseTime = parseInt(headers["req-duration"]!) / 1000;

        status = "up";
        uptime += check.interval / 1000;
        console.log("Website is up");

        if (report!.status == "down") {
          // TODO: emit website up event
        }
      } catch (err) {
        status = "down";
        downtime += check.interval / 1000;
        if (report!.status == "up") {
          // TODO: emit website down event
          outages = 1;
        }
      }

      console.log(uptime, downtime, outages);

      await Report.findOneAndUpdate(
        { checkId: check.id },
        {
          $set: { status: status },
          $push: { history: timestamp },
          $inc: {
            uptime: uptime,
            downtime: downtime,
            outages: outages,
          },
        },
        { upsert: true }
      );
    }, check.interval);

    return intervalId;
  }
}

const pollingSvc = new PollingService();
pollingSvc.bootstrap();

export { pollingSvc };
