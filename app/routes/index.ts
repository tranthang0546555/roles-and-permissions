import express from "express";
import adminRoute from "./admin";
import authRoute from "./auth";
import userRoute from "./users";
import rolesRoute from "./roles";
import PRRoute from "./permission_resources";
import RPRoute from "./role_permission";
import { auth } from "../middleware";
const router = express.Router();

router.use("/auth", authRoute);
router.use("/users", auth, userRoute);
router.use("/admin", adminRoute);
router.use("/roles", auth, rolesRoute);
router.use("/permission-resources", PRRoute);
router.use("/role-permission", RPRoute);

export default router;
