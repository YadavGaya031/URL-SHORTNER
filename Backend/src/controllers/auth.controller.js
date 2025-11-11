import { cookieOptions } from "../config/config.js";
import { loginUser, registerUser } from "../services/auth.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { findUserById, deleteUserById } from "../dao/user.dao.js";
import comparePassword from "../models/user.model.js";

export const register_user = wrapAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const { token, user } = await registerUser(name, email, password);
  req.user = user;
  res.cookie("accessToken", token, cookieOptions);
  res.status(200).json({ message: "register success" });
});

export const login_user = wrapAsync(async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);
    req.user = user;
    res.cookie("accessToken", token, cookieOptions);
    res.status(200).json({ user: user, message: "login success" });
  } catch (err) {
    console.log("Login Error", err);
    return res.status(500).json({
      error: err.message,
    });
  }
});

export const logout_user = wrapAsync(async (req, res) => {
  res.clearCookie("accessToken", cookieOptions);
  res.status(200).json({ message: "logout success" });
});

export const get_current_user = wrapAsync(async (req, res) => {
  res.status(200).json({ user: req.user });
});

export const updateName = wrapAsync(async (req, res) => {
  const { name } = req.body;
  if (!name || name.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Name is required",
    });
  }
  req.user.name = name;
  await req.user.save();
  res.status(200).json({
    success: true,
    message: "Name updated",
    user: req.user,
  });
});

export const changePassword = wrapAsync(async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Both Passwords are required",
      });
    }
    const isMatch = await req.user.comparePassword(oldPassword);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old Password is incorrect",
      });
    }
    req.user.password = newPassword;
    await req.user.save();
    await sendEmail(
      req.user.email,
      "Your Linkly password was changed",
      `<h3>Hello ${req.user.name},</h3>
        <p>Your password was successfully updated.</p>
        <p>If you didn't request this, contact support immediately.</p>`
    );

    res.clearCookie("accessToken", cookieOptions);
    res.status(200).json({
      success: true,
      message: "Password updated successfully. Please login again.",
    });
  } catch (err) {
    console.error("Password change error:", err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

export const deleteAccount = wrapAsync(async (req, res) => {
  await deleteUserById(req.user._id);
  res.clearCookie("accessToken");
  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
});
