import { check } from "express-validator";
export const userValidator = [
  check("email").normalizeEmail().isEmail().withMessage("Email is Invalid"),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is missing")
    .isLength({ min: 4, max: 20 })
    .withMessage("Invalid Name, Name should be  3 to 20 characters long !"),
];
