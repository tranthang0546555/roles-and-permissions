import express from "express";
import { PermissionResource } from "../models/permission_resource.model";
const router = express.Router();

router
  // Create new Permission resource
  .post("/", async (req, res) => {
    try {
      const data = await PermissionResource.create({
        ...(req.body as PermissionResource),
      });
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: "Error",
        message: "Permission is existed",
      });
    }
  })
  .get("/", async (req, res) => {
    try {
      const data = await PermissionResource.findAll();
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: "Error",
      });
    }
  });

export default router;
