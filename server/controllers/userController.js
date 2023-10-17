import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateJwtToken } from "../utils/generateJwtToken.js";
import { json } from "express";
import Token from "../models/tokenModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { createToken } from "../utils/createToken.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    generateJwtToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      verified: user.verified,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateJwtToken(res, user._id);
    const newToken = await createToken(user._id, "verification");
    const link = `${process.env.CLIENT_URL}verifyAccount?token=${newToken}&id=${user._id}`;

    res.status(201).json({
      _id: user._id,
      verified: user.verified,
      name: user.name,
      email: user.email,
    });
    await sendEmail(
      email,
      "Welcome to CashFlow",
      { name: user.name, url: link },
      "/server/templates/welcome.ejs"
    );
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

export const requestPasswordReset = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "No account with this email" });

  const newToken = await createToken(user._id, "password reset");

  const link = `${process.env.CLIENT_URL}passwordReset?token=${newToken}&id=${user._id}`;

  await sendEmail(
    email,
    "Password reset request",
    { name: user.name, url: link },
    "/server/templates/requestResetPassword.ejs"
  );
  res.status(200).json({ message: "Email sent" });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { userId, token, password } = req.body;

  let resetToken = await Token.findOne({ userId, type: "password reset" });

  if (!resetToken || !(await bcrypt.compare(token, resetToken.token))) {
    return res
      .status(400)
      .json({ message: "Invalid or expired password reset token" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  await User.updateOne(
    { _id: userId },
    { $set: { password: hashPassword } },
    { new: true }
  );

  const updatedUser = await User.findById({ _id: userId });
  await resetToken.deleteOne();
  res.status(200).json({ message: "Password changed!" });
  await sendEmail(
    updatedUser.email,
    "Password Reset Successfully",
    {
      name: updatedUser.name,
      url: process.env.CLIENT_URL,
    },
    "/server/templates/resetPassword.ejs"
  );
});

export const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    verified: req.user.verified,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      verified: updatedUser.verified,
      name: updatedUser.name,
      email: updatedUser.email,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export const requestVerifyAccount = asyncHandler(async (req, res) => {
  const { _id, name, email } = req.user;

  const user = await User.findById(req.user._id).select("name email verified");
  if (user.verified)
    return res.status(200).json({ message: "User already verified", user });

  const newToken = await createToken(_id, "verification");
  const link = `${process.env.CLIENT_URL}verifyAccount?token=${newToken}&id=${_id}`;
  await sendEmail(
    email,
    "Verification request",
    { name: name, url: link },
    "/server/templates/verificationRequest.ejs"
  );
  res.status(200).json({ message: "Verification email has been sent" });
});

export const verifyAccount = asyncHandler(async (req, res) => {
  const { userId, token } = req.body;

  const user = await User.findOne({ _id: userId }).select(
    "name email verified"
  );
  if (user.verified)
    return res
      .status(200)
      .json({ message: "This email has already been verified", user });

  let verificationToken = await Token.findOne({ userId, type: "verification" });

  if (
    !verificationToken ||
    !(await bcrypt.compare(token, verificationToken.token))
  ) {
    return res
      .status(400)
      .json({ message: "Invalid or expired verification token" });
  }

  await User.updateOne(
    { _id: userId },
    { $set: { verified: true } },
    { new: true }
  );
  await verificationToken.deleteOne();
  const updatedUser = await User.findOne({ _id: userId }).select(
    "name email verified"
  );

  res
    .status(200)
    .send({ message: "Email verified successfully", user: updatedUser });
});
