import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import AuthRouter from "./modules/auth";
import QuestionRouter from "./modules/question";
import UserRouter from "./modules/user";
import AdminRouter from "./modules/admin";

class App {
  public express: express.Application;

  public constructor() {
    // Sentry.init({
    //   dsn: 'https://05a5f96275564b46b013e596a0dcc2fe@sentry.io/1544826',
    //   environment: process.env.NODE_ENV
    // })

    this.express = express();
    this.config();
    this.routes();

    this.express.use("/v1", AuthRouter);
    this.express.use("/v1", UserRouter);
    this.express.use("/v1", AdminRouter);

    // this.express.use(AuthMiddleware)

    this.express.use("/v1", QuestionRouter);
  }

  private config(): void {
    this.express.use(cors());
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  public routes(): void {
    // this.express.use(Sentry.Handlers.requestHandler())

    this.express.get("/health", (_req: any, _res: any) => {
      return _res.json({ health: true });
    });

    // this.express.use(Sentry.Handlers.errorHandler())
    // this.express.use(function onError(err, req, res, next) {
    //   res.statusCode = 500
    //   res.end(res.sentry + '\n')
    // })
  }
}

export default new App().express;
