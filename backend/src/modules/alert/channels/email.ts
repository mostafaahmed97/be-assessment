import { AlertChannel } from "../alert.interface";

class EmailAlerts implements AlertChannel {
  notify() {
    console.log("Sending Email alert");
  }
}

export default EmailAlerts;
