import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Component/Header/Header";
import AllRecipeCards from "./Component/RecipeCards/AllRecipeCards";
import Notification from "./Component/UI/Notification";
import { Fragment } from "react";
import { useSelector } from "react-redux";

function App() {
  const notification = useSelector((state) => state.UI.notification);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Header></Header>
      <AllRecipeCards />
    </Fragment>
  );
}

export default App;
