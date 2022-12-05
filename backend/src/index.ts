import app from "./app/app";
import config from "./config";
import * as db from "./database";
import { pollingSvc } from "./modules/polling/polling.service";

async function bootstrap() {
  try {
    console.log("Starting server....");
    await db.connect();
    await pollingSvc.bootstrap();
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    await db.disconnect();
    console.log("Failed to start server!");
  }
}

bootstrap();
