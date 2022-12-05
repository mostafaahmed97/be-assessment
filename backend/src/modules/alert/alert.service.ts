import { EventEmitter } from "events";
import { ICheck } from "../check/check.entity";
import { AlertChannel } from "./alert.interface";

import EmailAlerts from "./channels/email";
import SlackAlerts from "./channels/slack";
import DiscordAlerts from "./channels/discord";

const alertChannels: Array<AlertChannel> = [
  new EmailAlerts(),
  new SlackAlerts(),
  new DiscordAlerts(),
];

const alertSvc = new EventEmitter();

// TODO : Implement notifications
alertSvc.on("website-status-change", function () {
  alertChannels.forEach((channel) => channel.notify());
});

export default alertSvc;
