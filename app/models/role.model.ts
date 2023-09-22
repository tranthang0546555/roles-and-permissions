import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export class Role extends Model {
  public id!: number;
  public name!: string;
  public desc!: string;
  public roleDefault!: boolean;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    desc: {
      type: DataTypes.STRING,
    },
    roleDefault: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: Role.name,
  }
);
