import app from "./app/app";
import config from "./config";
import * as db from "./database";
import { pollingSvc } from "./modules/polling/polling.service";

async function bootstrap() {
  try {
    console.log("Starting server....");

    await db.connect();
    console.log("Database Connected");
    await pollingSvc.bootstrap();
    app.listen(config.port, () => {
      console.log(`Server started on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
    await db.disconnect();
  }
}

bootstrap();
