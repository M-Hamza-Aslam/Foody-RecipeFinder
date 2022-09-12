import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import UIReducer from "./UISlice";
import recipesReducer from "./recipesSlice";
const store = configureStore({
  reducer: { auth: authReducer, UI: UIReducer, recipes: recipesReducer },
});
export default store;
