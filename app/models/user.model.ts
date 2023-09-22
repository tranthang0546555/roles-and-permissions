import { DataTypes, ForeignKey, Model } from "sequelize";
import { sequelize } from "../config/database";
import { Role } from "./role.model";

export class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public roleId!: ForeignKey<number>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: User.name,
  }
);

User.belongsTo(Role, {
  foreignKey: "roleId",
});
