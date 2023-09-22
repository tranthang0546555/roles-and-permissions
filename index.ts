import express, { Express } from "express";
import routes from "./app/routes";
import { connectDB } from "./app/config";
const app: Express = express();
const port = 3000;

app.use(express.json());

connectDB();

app.use("/api", routes);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
