import express from "express";
import { Role } from "../models/role.model";
const router = express.Router();

router
  // Create new Role
  .post("/", async (req, res) => {
    try {
      const role = await Role.create({ ...(req.body as Role) });
      res.json({ role });
    } catch (error) {
      res.status(400).json({
        error: "Error",
        message: "Role is existed",
      });
    }
  })
  .get("/", async (req, res) => {
    try {
      const data = await Role.findAll();
      res.json({ data });
    } catch (error) {
      res.status(400).json({
        error: "Error",
      });
    }
  });

export default router;
