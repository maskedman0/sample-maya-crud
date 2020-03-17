import { App } from "@mayajs/core";
import { Mongo } from "@mayajs/mongo";
import { routes } from "./app.routing.module";
import { environment } from "./environments";

@App({
  cors: true,
  logs: "dev",
  port: 3333,
  database: Mongo({
    connectionString: environment.MONGO_URI,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    }
  }),
  routes
})
export class AppModule {}