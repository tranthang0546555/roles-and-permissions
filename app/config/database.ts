import { Sequelize } from "sequelize";

// TODO .env
const USER = "postgres";
const PW = "mysecretpassword";
const DB = "postgres";

export const sequelize = new Sequelize(DB, USER, PW, {
  host: "localhost",
  dialect:
    "postgres" /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database synchronized successfully!");
    console.log("Connection has been established successfully.");
    return;
    sequelize.sync({ force: true }).then(() => {});
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
