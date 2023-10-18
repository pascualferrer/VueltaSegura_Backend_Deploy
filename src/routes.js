import Router from "koa-router";
import routerUsers from "./routes/users.js";

const router = new Router();

router.use('/users', routerUsers.routes());

export default router;