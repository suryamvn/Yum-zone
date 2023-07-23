import axios from "axios";

// redux types
import { SIGN_IN, SIGN_UP, GOOGLE_AUTH, SIGN_OUT } from "./auth.type";

export const signIn = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      // url: `${process.env.REACT_APP_CLIENT_URL}auth/signin`,
      url: `http://localhost:4000/auth/signin`,
      data: { credentials: userData },
    });
    // console.log(`inside redux!!!!! ${User.data.fullName}`);

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${User.data.token}`;

    return dispatch({ type: SIGN_IN, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signUp = (userData) => async (dispatch) => {
  try {
    const User = await axios({
      method: "POST",
      // url: `${process.env.REACT_APP_CLIENT_URL}auth/signup`,
      url: `http://localhost:4000/auth/signup`,
      data: { credentials: userData },
    });

    localStorage.setItem(
      "zomatoUser",
      JSON.stringify({ token: User.data.token })
    );

    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${User.data.token}`;

    return dispatch({ type: SIGN_UP, payload: User.data });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const signOut = () => async (dispatch) => {
  try {
    localStorage.removeItem("zomatoUser");
    // window.location.href = "http://localhost:3000";

    return dispatch({ type: SIGN_OUT, payload: {} });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};

export const googleAuth = (token) => async (dispatch) => {
  try {
    localStorage.setItem("zomatoUser", JSON.stringify({ token }));

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    return dispatch({ type: GOOGLE_AUTH, payload: { token } });
  } catch (error) {
    return dispatch({ type: "ERROR", payload: error });
  }
};
