import { Router } from "express";
import rt_health from "../routes/health.route";
import rt_geturl from "../routes/geturl.route";
import mw_errorhandler from "../middlewares/errorhandler.middleware";

const router = Router();

router.use(rt_health); // health router
router.use(rt_geturl); // geturl router

export default router;
