import "reflect-metadata";
import App from "./app";
import AppRouter from "./routes";

const app = new App({ port: 4000, routes: AppRouter.routes });

app.start();
