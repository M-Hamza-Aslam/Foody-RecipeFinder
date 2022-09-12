import { UIActions } from "./UISlice";
import { authActions } from "./authSlice";
import { recipesActions } from "./recipesSlice";

const putHttpRequest = async (dispatch, auth, url, method) => {
  try {
    auth.hideModal();
    console.log("pending");
    dispatch(
      //creating
      UIActions.showNotification({
        status: "pending",
        title: "authenticating...",
        message: "authenticating account",
      })
    );
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: auth.email,
        password: auth.password,
        returnSecureToken: true,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error();
    }
    //success
    console.log("success");
    const data = await response.json();
    dispatch(authActions.login({ response: data }));
    if (method === "login") {
      //fetch fav url
      url = `https://foody-recipefinder-default-rtdb.asia-southeast1.firebasedatabase.app/users/${data.localId}.json`;
      const favResponse = await fetch(url);
      if (!favResponse.ok) {
        throw new Error();
      }
      const favData = await favResponse.json();
      const favUrl = [];
      if (favData) {
        for (const key in favData) {
          favUrl.push(favData[key].recipeData.recipe.url);
        }
      }
      dispatch(recipesActions.fetchFavUrl({ url: favUrl }));
    }
    dispatch(
      UIActions.showNotification({
        status: "success",
        title: "authenticated",
        message: "user has been authenticated Successfully!",
      })
    );
  } catch (error) {
    console.log(error);
    dispatch(
      UIActions.showNotification({
        status: "error",
        title: "Error!",
        message: "user authentication failed!",
      })
    );
  }
  setTimeout(() => {
    dispatch(UIActions.hideNotification());
  }, 2000);
};

export const signUp = (auth) => {
  return (dispatch) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDR7Fb1LEDNVj0SNh-qw3meCBPgJQF9_gw";
    putHttpRequest(dispatch, auth, url, "signup");
  };
};

export const login = (auth) => {
  return (dispatch) => {
    const url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDR7Fb1LEDNVj0SNh-qw3meCBPgJQF9_gw";
    putHttpRequest(dispatch, auth, url, "login");
  };
};
