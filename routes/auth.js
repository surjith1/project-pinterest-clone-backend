import express, { Router } from "express";
import env from "dotenv";
import { User } from "../models/user.js";
import Joi from "joi";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Token } from "./../models/token.js";

env.config();
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email.trim() || !password.trim())
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid Password" });
    // if (!user.verified) {
    //   let token = await Token.findOne({ userId: user._id });
    //   if (!token) {
    //     token = await new Token({
    //       userId: user._id,
    //       token: crypto.randomBytes(32).toString("hex"),
    //     }).save();
    //     const url = `${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
    //     await sendEmail(user.email, "Verify Email", url);
    //   }
    //   return res
    //     .status(400)
    //     .send({ message: "An Email sent to your account please verify" });
    // }

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: "logged in successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity()
      .required()
      .minlength(4)
      .maxlength(12)
      .label("Password"),
  });
  return schema.validate(data);
};
export const authRoutes = router;
