declare module "@koa/access-log" {
    import { Middleware } from "koa";
    export default function accessLogs(): Middleware;
}
