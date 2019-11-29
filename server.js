const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/error");

const authRouter = require("./routes/auth");
const itemRouter = require("./routes/item");

dotenv.config({ path: "./config/config.env" });
connectDB();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.use("/api/auth", authRouter);
app.use("/api/item", itemRouter);

app.use(errorMiddleware);
app.listen(7000, () => {
  console.log("Servidor Iniciado");
});
