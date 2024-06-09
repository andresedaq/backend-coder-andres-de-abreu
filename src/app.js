import express from "express";
import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";

connectMongoDB()
const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router)
app.use(session({
  store: MongoStore.create({
    mongoUrl: "mongodb+srv://admin:admin123456@e-commerce.itjjvkv.mongodb.net/ecommerce",
    ttl: 15,
  }),
  secret: "CodigoSecreto",
  resave: true
}))

const server = app.listen(port, () => {
  console.log(`Server ready on port ${port}`);
});

export default server;
