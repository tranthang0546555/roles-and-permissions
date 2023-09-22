import { DataTypes, ForeignKey, Model } from "sequelize";
import { sequelize } from "../config/database";
import { PermissionResource } from "./permission_resource.model";
import { Role } from "./role.model";

export class RolePermission extends Model {
  public id!: number;
  public roleId!: ForeignKey<number>;
  public permissionId!: ForeignKey<number>;
}

RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permissionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: RolePermission.name,
    indexes: [
      {
        unique: true,
        fields: ["roleId", "permissionId"],
        name: "unique_roleId_permissionId",
      },
    ],
  }
);

RolePermission.belongsTo(Role, {
  foreignKey: "roleId",
});
RolePermission.belongsTo(PermissionResource, {
  foreignKey: "permissionId",
});
