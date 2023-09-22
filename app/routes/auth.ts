import bcrypt from "bcrypt";
import express from "express";
import jwt from "jsonwebtoken";
import { IPayload } from "../interfaces";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
const router = express.Router();
export const SECRET_KEY = "wyn";

export interface Inputs {
  email: string;
  password: string;
}
router.post("/register", async (req, res) => {
  const { email, password }: Inputs = req.body;
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    // Get role default while register
    const role = await Role.findOne({
      where: { roleDefault: true },
    });
    if (!role) throw new Error("Role_table empty or default not set yet");

    const payload: IPayload = { email, roleId: role.id };
    const accessToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "20d",
    });

    const user = await User.create({
      email,
      password: passwordHash,
      roleId: role.id,
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .header("Authorization", accessToken)
      .send(user);
  } catch (error: any) {
    res.status(400).json({
      error: "ERROR",
      message: error?.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password }: Inputs = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Wrong password");

    const payload: IPayload = { email, roleId: user.roleId };

    const accessToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "1d", // Set 1d to test, default: 15m
    });

    const refreshToken = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "20d",
    });

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
      })
      .header("Authorization", accessToken)
      .send(user);
  } catch (error: any) {
    res.status(400).json({
      error: "ERROR",
      message: error?.message,
    });
  }
});

export default router;
