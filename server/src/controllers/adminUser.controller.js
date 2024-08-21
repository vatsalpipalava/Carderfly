import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { cookieOptions, clearCookieOptions } from "../config/options.js";
import { AdminUser } from "../models/admin.model.js";

const registerAdminUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const existedUser = await AdminUser.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User already exists.");
  }

  const adminUser = await AdminUser.create({
    firstName,
    lastName,
    email,
    password,
  });

  const createdAdminUser = await AdminUser.findById(adminUser._id).select(
    "-password -refreshToken"
  );

  if (!createdAdminUser) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdAdminUser,
        "Admin User Registered Successfully."
      )
    );
});

const loginAdminUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  const foundUser = await AdminUser.findOne({
    email: email,
  }).exec();

  if (!foundUser) {
    throw new ApiError(404, "User does not exist.");
  }

  const match = await foundUser.isPasswordCorrect(password);
  if (match) {
    const accessToken = foundUser.generateAccessToken();
    const newRefreshToken = foundUser.generateRefreshToken();

    let newRefreshTokenArray = !cookies?.admin_token // TODO: Change jwt to admin_token
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.admin_token); // TODO: Change jwt to admin_token

    if (cookies?.admin_token) {
      // TODO: Change jwt to admin_token
      /* 
          Scenario added here: 
            1) User logs in but never uses RT and does not logout 
            2) RT is stolen
            3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
        */
      const refreshToken = cookies.admin_token; // TODO: Change jwt to admin_token
      const foundToken = await AdminUser.findOne({ refreshToken }).exec();

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("admin_token", clearCookieOptions); // TODO: Change jwt to admin_token
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save({ validateBeforeSave: false });

    // Creates Secure Cookie with refresh token
    res.cookie("admin_token", newRefreshToken, cookieOptions); // TODO: Change jwt to admin_token

    // Send access token to Admin user
    res.json({ accessToken });
  } else {
    // res.sendStatus(401);
    throw new ApiError(401, "Unauthorized");
  }
});

const logoutAdminUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.admin_token) {
    return res.status(200).json(new ApiResponse(200, {}, "Already Logout."));
  }
  const refreshToken = cookies.admin_token;

  // Is refreshToken in db?
  const foundUser = await AdminUser.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("admin_token", clearCookieOptions); // TODO: Change jwt to admin_token
    return res
      .status(200)
      .json(new ApiResponse(200, {}, "User not found. Already Logout."));
    // res.status(204).json(new ApiResponse(204, {}, ""));
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  const result = await foundUser.save({ validateBeforeSave: false });

  res.clearCookie("admin_token", clearCookieOptions); // TODO: Change jwt to admin_token
  res.status(200).json(new ApiResponse(200, {}, "Logout Successfully."));
});

const handleAdminRefreshToken = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.admin_token) return res.sendStatus(401);

  const refreshToken = cookies.admin_token;
  res.clearCookie("admin_token", clearCookieOptions);

  const foundUser = await AdminUser.findOne({ refreshToken }).exec();

  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
          // throw new ApiError(403, "Forbidden");
        }

        // Delete refresh tokens of hacked user
        const hackedUser = await AdminUser.findOne({
          _id: decoded._id,
          email: decoded.email,
        });
        // hackedUser.refreshToken = [];
        // const result = await hackedUser.save();

        if (hackedUser) {
          hackedUser.refreshToken = [];
          await hackedUser.save({ validateBeforeSave: false });
        }
      }
    );
    return res.sendStatus(403);
    // throw new ApiError(403, "Forbidden t");
  }
  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray];
        const result = await foundUser.save({ validateBeforeSave: false });
      }

      const userIdString = foundUser._id.toString();

      if (err || userIdString !== decoded._id) {
        return res.sendStatus(403);
        // return res.status(403).json(new ApiResponse(403, {}, "Forbidden"))
      }

      // Refresh token was still valid
      const accessToken = foundUser.generateAccessToken();
      const newRefreshToken = foundUser.generateRefreshToken();

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save({ validateBeforeSave: false });

      // Creates Secure Cookie with refresh token
      res.cookie("admin_token", newRefreshToken, cookieOptions); // TODO: Change jwt to admin_token

      res.json({ email: result.email, accessToken });
    }
  );
});

export {
  registerAdminUser,
  loginAdminUser,
  logoutAdminUser,
  handleAdminRefreshToken,
};
