import "reflect-metadata";
import App from "./app";
import { PORT } from "./config";
import AppRouter from "./routes";

const app = new App({ port: +PORT, routes: AppRouter.routes });

app.start();
