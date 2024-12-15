import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "@koa/bodyparser";
import cors from "@koa/cors";
import accessLogs from "@koa/access-log";

const app = new Koa();
const router = new Router();

const isDevelopmentMode = process.env.NODE_ENV !== "production";

app.use(
    cors({
        origin: () => {
            if (isDevelopmentMode) {
                return "*"; // Allow any localhost origin
            }
            return "*"; // Change this to your domain
        },
    }),
);
app.use(accessLogs());
app.use(bodyParser());

router.get("/", (ctx) => {
    ctx.body = { message: "Welcome to DoItMorro API!" };
});

app.use(router.routes()).use(router.allowedMethods());

export { app };
