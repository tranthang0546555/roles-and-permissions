import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class PermissionResource extends Model {
  public id!: number;
  public code!: string;
  public method!: "GET" | "POST" | "DELETE" | "PATCH";
  public name!: string;
}

PermissionResource.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM(...["GET", "POST", "DELETE", "PATCH"]),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: PermissionResource.name,
    indexes: [
      {
        unique: true,
        fields: ["code", "method"],
        name: "unique_code_method",
      },
    ],
  }
);
