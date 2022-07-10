import nodemailer from "nodemailer";

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      //service: process.env.SERVICE,
      port: Number(process.env.PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USERNAME,
        pass: process.env.PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.USERNAME,
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};

// import nodemailer from "nodemailer";

// export const mailTransport = () =>
//   nodemailer.createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.MAILTRAP_USERNAME,
//       pass: process.env.MAILTRAP_PASSWORD,
//     },
//   });

// export const generateEmailTemplate = (code) => {
//   return `
//       <DOCTYPE html>
//       <html lang="en">
//       <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-compatible" content="IE=edge" >
//       <style>
//       @media only screen and (max-width:620px) {
//           h1 {
//               font-size:20px;
//               padding:5px
//           }
//       }
//       </style>

//       </head>
//       <body>
//       <div>
//   <div style="max-width:620px; margin:0 auto; font-family:sans-serif; color:#272727;">
//   <h1 style="background:#f6f6f6; padding:10; text-align:center, color:#272727;">
//   we are delighted to welcome to out team !</h1>
//   <p> Please verify your email to contineue your verification code is: </p>
//   <p style="width:80px; margin:0 auto; font-weight:bold; text-align:center; color:#272727; font-size:25px; border-radius:6px;"> ${code} </p>

//   </div>
//   </div>
//       </body>
//       </html>
//       `;
// };

// export const plainEmailTemplate = (heading, message) => {
//   return `
//       <DOCTYPE html>
//       <html lang="en">
//       <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-compatible" content="IE=edge" >
//       <style>
//       @media only screen and (max-width:620px) {
//           h1 {
//               font-size:20px;
//               padding:5px
//           }
//       }
//       </style>

//       </head>
//       <body>
//       <div>
//   <div style="max-width:620px; margin:0 auto; font-family:sans-serif; color:#272727;">
//   <h1 style="background:#f6f6f6; padding:10; text-align:center, color:#272727;">
//   ${heading}</h1>
//   <p style="color:#272727; text-align:center;"> ${message} </p>

//   </div>
//   </div>
//       </body>
//       </html>
//       `;
// };

// export const generatePasswordResetTemplate = (url) => {
//   return `
//       <DOCTYPE html>
//       <html lang="en">
//       <head>
//       <meta charset="UTF-8">
//       <meta http-equiv="X-UA-compatible" content="IE=edge" >
//       <style>
//       @media only screen and (max-width:620px) {
//           h1 {
//               font-size:20px;
//               padding:5px
//           }
//       }
//       </style>

//       </head>
//       <body>
//       <div>
//   <div style="max-width:620px; margin:0 auto; font-family:sans-serif; color:#272727;">
//   <h1 style="background:#f6f6f6; padding:10; text-align:center, color:#272727;">
//   Response to your Reset Password Request set !</h1>
//   <p style="color:#272727;"> Please link below to reset password: </p>
//   <div style=" text-align:center; ">
//   <a href="${url}"  style="margin:0 auto; font-family:sans-serif; color:#fff; padding:10; text-align:center; background:#e63946; border-radius:5px;cursor:pointer; text-decoration:none;display:inline-block;"> Reset Password </a> </div>
//   </div>
//   </div>
//       </body>
//       </html>
//       `;
// };
// export const sendEmail = (options) => {
//   const transporter = nodemailer.createTransport({
//     service: process.env.EMAIL_SERVICE,
//     auth: {
//       user: process.env.EMAIL_USERNAME,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_FROM,
//     to: options.to,
//     subject: options.subject,
//     html: options.text,
//   };

//   transporter.sendMail(mailOptions, function (err, info) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(info);
//     }
//   });
// };
