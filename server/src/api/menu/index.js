import express from "express";
import { MenuModel, ImageModel } from "../../database/allModels";

const Router = express.Router();

/**
 * Route     /list
 * Des       Update user data
 * Params    _id
 * Access    Private
 * Method    Put
 */
Router.get("/list/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menus = await MenuModel.findById(_id);
    if (!menus) {
      return res
        .status(404)
        .json({ error: "No menu present for this restaurant" });
    }
    // console.log("\n");
    // console.log(menus.menus[0].items);
    return res.json({ menus });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /list
 * Des       Update user data
 * Params    _id
 * Access    Private
 * Method    Put
 */
Router.get("/image/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const menuImages = await ImageModel.findById(_id);
    if (!menuImages) {
      res.status(404).json({ error: "No menu images found." });
    }
    return res.json({ menuImages });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
