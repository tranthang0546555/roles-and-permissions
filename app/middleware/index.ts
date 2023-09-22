import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAuthRequest, IPayload } from "../interfaces";
import { PermissionResource } from "../models/permission_resource.model";
import { RolePermission } from "../models/role_permission.model";
import { User } from "../models/user.model";
import { SECRET_KEY } from "../routes/auth";

export const auth = async (
  req: Request & IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.header("Authorization")?.replace("Bearer ", "");
  if (!accessToken)
    return res.status(401).send("Unauthorized, Access token not provided");
  const refreshToken = req.cookies?.["refreshToken"];
  try {
    // Verify token and user valid
    const payload = jwt.verify(accessToken, SECRET_KEY);
    const { email, roleId } = payload as IPayload;
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({
        error: "Unauthorized",
        message: "User not found",
      });

    // Verify role - permission
    const code = req.baseUrl,
      method = req.method;
    const permissionResource = await PermissionResource.findOne({
      where: { code, method },
    });

    if (permissionResource) {
      const rolePermission = await RolePermission.findOne({
        where: { roleId, permissionId: permissionResource.id },
      });
      if (rolePermission) {
        req.user = user as IPayload;
        return next();
      }
    }
    return res.status(403).json({
      error: "Forbidden",
      message: `User not permitted | code: ${code}, method: ${method}, name: ${permissionResource?.name}`,
    });
  } catch (err) {
    console.log("auth error:: ", err);
    if (!refreshToken)
      return res.status(401).json({
        error: "Unauthorized",
        message: "Refresh token not provided",
      });
    try {
      const decoded = jwt.verify(refreshToken, SECRET_KEY);
      const accessToken = jwt.sign(decoded, SECRET_KEY, {
        expiresIn: "15m",
      });
      res.header("Authorization", accessToken).send(decoded);
    } catch (error) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Refresh token is invalid",
      });
    }
  }
};
