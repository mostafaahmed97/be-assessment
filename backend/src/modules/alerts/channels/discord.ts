import { AlertChannel } from "../alert.interface";

class DiscordAlerts implements AlertChannel {
  notify() {
    console.log("Sending Discord alert");
  }
}

export default DiscordAlerts;
