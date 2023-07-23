import express from "express";

import { UserModel } from "../../database/allModels";

const Router = express.Router();
import passport from "passport";

/**
 * Route     /
 * Des       Get authorized user data
 * Params    none
 * Access    Private
 * Method    Get
 */

Router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { email, fullname, phoneNumber, address } = req.user;

      // console.log(`inside router /user... sending ${fullname}`);
      return res.json({ user: { email, fullname, phoneNumber, address } });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

/**
 * Route     /:_id
 * Des       Get user data (For review System)
 * Params    _id
 * Access    Public
 * Method    Get
 */

Router.get("/:_id", async (req, res) => {
  try {
    console.log("reached :id route in server!!!!!!!!!!!!!!!!");
    const { _id } = req.params;
    const getUser = await UserModel.findById(_id);
    if (!getUser) {
      return res.status(404).json({ error: "User not found" });
    }
    const { fullName } = getUser;
    return res.json({ user: { fullName } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /update/:_id
 * Des       Update user data
 * Params    _id
 * Access    Private
 * Method    Put
 */

Router.put(
  "/update/:_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { _id } = req.params;
      const { userData } = req.body;

      userData.password = undefined;

      const updateUserData = await UserModel.findByIdAndUpdate(
        _id,
        {
          $set: userData,
        },
        {
          new: true,
        }
      );
      return res.json({ user: updateUserData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
);

export default Router;
