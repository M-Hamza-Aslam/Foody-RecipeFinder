import { recipesActions } from "./recipesSlice";
import { UIActions } from "./UISlice";

export const fetchRecipes = (actions) => {
  return async (dispatch) => {
    try {
      console.log("fetching...");
      dispatch(
        //creating
        UIActions.showNotification({
          status: "pending",
          title: "fetching...",
          message: "Fetching Recipes!",
        })
      );
      let url;
      if (actions.method === "apiFetch") {
        const appKey = "f3dcccf3cc8bbc757ed4d5552678b2ce";
        const appId = "14c250f0";
        //fetching recipes from API
        if (actions.searchKeyword.trim().length === 0) {
          throw new Error();
        }
        url = `https://api.edamam.com/search?q=${actions.searchKeyword}&app_id=${appId}&app_key=${appKey}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        dispatch(
          recipesActions.fetchRecipes({
            recipes: data.hits,
            isFavFetched: false,
          })
        );

        //fetching favurl and favkeys
        console.log(actions.UID);
        url = `https://foody-recipefinder-default-rtdb.asia-southeast1.firebasedatabase.app/users/${actions.UID}.json`;
        const favResponse = await fetch(url);
        if (!favResponse.ok) {
          throw new Error();
        }
        const favData = await favResponse.json();
        const favUrl = [];
        const favKeys = {};
        if (favData) {
          for (const key in favData) {
            favUrl.push(favData[key].recipeData.recipe.url);
            const url = favData[key].recipeData.recipe.url;
            favKeys[url] = key;
          }
        }
        dispatch(recipesActions.fetchFavUrl({ url: favUrl, favKeys }));
      } else if (actions.method === "favFetch") {
        url = `https://foody-recipefinder-default-rtdb.asia-southeast1.firebasedatabase.app/users/${actions.UID}.json`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error();
        }
        const data = await response.json();
        const favRecipes = [];
        const favKeys = {};
        if (data) {
          for (const key in data) {
            favRecipes.push(data[key].recipeData);
            const url = data[key].recipeData.recipe.url;
            favKeys[url] = key;
          }
        }
        dispatch(
          recipesActions.fetchRecipes({
            recipes: favRecipes,
            favKeys,
            isFavFetched: true,
          })
        );
      }
      console.log("success");
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "Fetched",
          message: "Recipes have been fetched Successfully!",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error",
          message: "Recipes fetching failed!",
        })
      );
    }
    setTimeout(() => {
      dispatch(UIActions.hideNotification());
    }, 2000);
  };
};

export const storeFavRecipe = (actions) => {
  return async (dispatch) => {
    try {
      console.log("storing...");
      dispatch(
        //creating
        UIActions.showNotification({
          status: "pending",
          title: "storing...",
          message: "storing Recipe!",
        })
      );
      const recipeData = {
        recipe: {
          image: actions.recipeData.recipe.image,
          label: actions.recipeData.recipe.label,
          url: actions.recipeData.recipe.url,
          ingredients: actions.recipeData.recipe.ingredients,
        },
      };
      const response = await fetch(
        `https://foody-recipefinder-default-rtdb.asia-southeast1.firebasedatabase.app/users/${actions.UID}.json`,
        {
          method: "POST",
          body: JSON.stringify({
            recipeData,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error();
      }
      //update favurl and favkeys
      const favResponse = await fetch(
        `https://foody-recipefinder-default-rtdb.asia-southeast1.firebasedatabase.app/users/${actions.UID}.json`
      );
      if (!favResponse.ok) {
        throw new Error();
      }
      const favData = await favResponse.json();
      const favUrl = [];
      const favKeys = {};
      if (favData) {
        for (const key in favData) {
          favUrl.push(favData[key].recipeData.recipe.url);
          const url = favData[key].recipeData.recipe.url;
          favKeys[url] = key;
        }
      }
      dispatch(
        recipesActions.fetchFavUrl({
          url: favUrl,
          favKeys,
        })
      );
      console.log("success");
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "stored",
          message: "Recipe has been stored Successfully!",
        })
      );
    } catch (error) {
      console.log("error");
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error",
          message: "Recipe storing failed!",
        })
      );
    }
    setTimeout(() => {
      dispatch(UIActions.hideNotification());
    }, 2000);
  };
};

export const unFavourite = (actions) => {
  return async (dispatch) => {
    //deleting fav recipe
    try {
      console.log("Removing...");
      dispatch(
        //creating
        UIActions.showNotification({
          status: "pending",
          title: "Removing...",
          message: "Removing Recipe from favourites!",
        })
      );
      const response = await fetch(
        `https://foody-recipefinder-default-rtdb.asia-southeast1.firebasedatabase.app/users/${actions.UID}/${actions.key}.json`,
        { method: "delete" }
      );
      if (!response.ok) {
        throw new Error();
      }
      dispatch(
        recipesActions.deleteFavRecipes({
          url: actions.url,
        })
      );
      console.log("success");
      dispatch(
        UIActions.showNotification({
          status: "success",
          title: "Fetched",
          message: "Recipe has been removed from favourites!",
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        UIActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Recipe removing has been failed!",
        })
      );
    }
    setTimeout(() => {
      dispatch(UIActions.hideNotification());
    }, 2000);
  };
};
