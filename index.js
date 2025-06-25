import express from "express";
import path from "path";
import userRoutes from "./routes/user.js";
import mongoose from "mongoose";

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("server started at port : ", PORT);
});
