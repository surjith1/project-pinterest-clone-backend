import { userSchemaCopy } from "../model/signupmodel.js";
import { ErrorResponse } from "../utils/errorResponse.js";
import {
  generatePasswordResetTemplate,
  mailTransport,
} from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  const { email, password, age } = req.body;
  try {
    const user = await userSchemaCopy.create({
      email,
      password,
      age,
    });

    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse("Please Provide and Email and Password", 400)
    );
  }
  try {
    const user = await userSchemaCopy.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid Credentials", 401));
    }
    sendToken(user, 200, res);
    //res.status(200).send({ success: true, token: "trdfasdf32dsfa" });
  } catch (error) {
    res.status(500).send({ success: false, error: error.message });
  }
};

export const forgotpassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await userSchemaCopy.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    try {
      mailTransport().sendMail({
        from: "security@email.com",
        to: user.email,
        subject: "Password Reset",
        html: generatePasswordResetTemplate(
          `http://localhost:3000/passwordreset/${resetToken}`
        ),
      });
      res.send({
        success: true,
        message: "Password Reset Link is sent to your Email.",
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
    }

    //const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    // const message = `
    //   <h1>You have requested a password reset</h1>
    //   <p>Please make a put request to the following link:</p>
    //   <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    // `;

    // try {
    //   await sendEmail({
    //     to: user.email,
    //     subject: "Password Reset Request",
    //     text: message,
    //   });

    //   res.status(200).json({ success: true, data: "Email Sent" });
    // } catch (err) {
    //   console.log(err);

    //   user.resetPasswordToken = undefined;
    //   user.resetPasswordExpire = undefined;

    //   await user.save();

    //   return next(new ErrorResponse("Email could not be sent", 500));
    // }
  } catch (err) {
    next(err);
  }
};

export const resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await userSchemaCopy.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).send({ success: true, token });
};
