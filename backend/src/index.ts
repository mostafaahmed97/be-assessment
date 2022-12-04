import app from "./app/app";
import config from "./config";
import connectToDB from "./database";

async function bootstrap() {
  await connectToDB();
  app.listen(config.port, () => {
    console.log(`Server start on port ${config.port}`);
  });
}

bootstrap();
