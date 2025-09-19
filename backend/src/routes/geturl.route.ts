import { Router } from "express";
import controller from "../controllers/geturl.controller";

const router = Router();

router.get("/geturl", controller.get);

export default router;
