import express from "express";
import passport from "passport";

import { UserModel } from "../../database/allModels";
import {
  ValidateSignup,
  ValidateSignin,
} from "../../validation/auth.validation";

const Router = express.Router();

Router.post("/signup", async (req, res) => {
  try {
    await ValidateSignup(req.body.credentials);
    // console.log("Hello");
    await UserModel.findByEmailAndPhone(req.body.credentials);
    // console.log("Hello");
    const newUser = await UserModel.create(req.body.credentials);
    const token = newUser.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.post("/signin", async (req, res) => {
  try {
    console.log("inside router!!!");
    await ValidateSignin(req.body.credentials);
    const user = await UserModel.findByEmailAndPassword(req.body.credentials);
    const token = user.generateJwtToken();
    return res.status(200).json({ token, status: "success" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

Router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

Router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    return res.redirect(
      `http://localhost:3000/google/${req.session.passport.user.token}`
    );
  }
);

export default Router;
