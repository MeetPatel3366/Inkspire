import express from "express";
import { User } from "../models/user.js";

const router = express.Router();

router.get("/signin", (req, res) => {
  return res.render("signin");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const isMatched = user.matchPassword(password);
  if (!isMatched && !user) {
    return res.status(400).json({
      success: false,
      message: "email & password incorrect",
    });
  }

  console.log("user", user);

  res.redirect("/");
});
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  console.log(req.body);

  await User.create({
    fullName,
    email,
    password,
  });

  return res.redirect("/");
});

export default router;
