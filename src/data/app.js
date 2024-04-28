import express from "express";
import fs from "fs";
import router from "./routes/index.js";

const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router)

const server = app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

export default server;
