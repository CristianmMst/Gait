import App from "./app";
import AppRouter from "./routes";

const app = new App({ port: 3000, routes: AppRouter.routes });

app.start();
