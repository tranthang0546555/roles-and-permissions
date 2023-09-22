import express from "express";
import { User } from "../models/user.model";
const router = express.Router();

router
  .get("/", async (req, res) => {
    // TODO pagination
    const data = await User.findAll();
    return res.json(data);
  })
  .delete("/:id", async (req, res) => {
    const { id } = req.params;
    const data = await User.destroy({ where: { id } });
    return res.json(data);
  });
export default router;
