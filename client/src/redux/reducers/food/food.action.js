import axios from "axios";

import { GET_FOOD, GET_FOOD_LIST } from "./food.type";

export const getFood = (foodId) => async (dispatch) => {
  try {
    const Food = await axios({
      method: "GET",
      url: `http://localhost:4000/food/${foodId}`,
    });

    return dispatch({ type: GET_FOOD, payload: Food.data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};

export const getFoodList = (menuId) => async (dispatch) => {
  try {
    console.log(menuId);
    const Menu = await axios({
      method: "GET",
      url: `http://localhost:4000/menu/list/${menuId}`,
    });

    console.log("redux:");
    console.log(Menu.data);

    return dispatch({ type: GET_FOOD_LIST, payload: Menu.data });
  } catch (error) {
    dispatch({ type: "ERROR", payload: error });
  }
};
