import express from "express";

import { RestaurantModel } from "../../database/allModels";
import {
  ValidateRestaurantCity,
  ValidateSearchString,
} from "../../validation/restaurant.validation";

const Router = express.Router();

/**
 * Route     /
 * Des       Get all restaurant based on city
 * Params    none
 * Access    public
 * Method    Get
 */

Router.get("/", async (req, res) => {
  try {
    // http://localhost:4000/restaurant/?city=hyderabad
    const { city } = req.query;
    await ValidateRestaurantCity(req.query);
    const restaurants = await RestaurantModel.find({ city });
    if (restaurants.length === 0) {
      res.json({ error: "No restaurant found in this city" });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /:_id
 * Des       Get individual restaurant details based on the id
 * Params    _id
 * Access    public
 * Method    Get
 */

Router.get("/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const restaurant = await RestaurantModel.findById(_id);

    if (!restaurant) {
      return res.status(400).json({ error: "Restaurant not found" });
    }
    return res.json({ restaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

/**
 * Route     /search/:searchString
 * Des       Get restaurants details based on search string
 * Params    searchString
 * Access    public
 * Method    Get
 */

Router.get("/search/:searchString", async (req, res) => {
  try {
    const { searchString } = req.params;
    await ValidateSearchString(req.params);
    const restaurants = await RestaurantModel.findById({
      name: { $regex: searchString, $options: "i" },
    });
    if (!restaurants.length === 0) {
      return res
        .status(404)
        .json({ error: `No restaurant matched with ${searchString}` });
    }
    return res.json({ restaurants });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
