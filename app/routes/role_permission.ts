import express from "express";
import { RolePermission } from "../models/role_permission.model";
const router = express.Router();

router
  // Create new Role - Permission resource
  .post("/", async (req, res) => {
    try {
      const data = await RolePermission.create({
        ...(req.body as RolePermission),
      });
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: "Error",
        message: "Role, Permission resource is not existed",
      });
    }
  })
  .get("/", async (req, res) => {
    try {
      const data = await RolePermission.findAll();
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: "Error",
      });
    }
  });

export default router;
