import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema({
  email: { type: "String", required: true },
  password: { type: "String", required: true, minlength: 5 },
  age: { type: "Number", maxlength: 3 },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("userDetails", userSchema);

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: passwordComplexity().required().label("Password"),
    age: Joi.number().label("Last Name"),
  });
  return schema.validate(data);
};

export { User, validate };
