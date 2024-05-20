import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";

connectMongoDB()
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router)

const server = app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

export default server;
