import { AlertChannel } from "../alert.interface";

class SlackAlerts implements AlertChannel {
  notify() {
    console.log("Sending Slack alert");
  }
}

export default SlackAlerts;
