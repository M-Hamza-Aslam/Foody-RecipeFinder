import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import RecipeIngredients from "./RecipeIngredients";
import classes from "./RecipeCard.module.css";
import { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeFavRecipe, unFavourite } from "../../store/recipesAction";

const RecipeCard = (props) => {
  const img = props.recipeDetails.recipe.image;
  const title = props.recipeDetails.recipe.label;
  const url = props.recipeDetails.recipe.url;

  const auth = useSelector((state) => state.auth);
  const UID = auth.authResponseData.localId;
  const isAuthenticated = auth.authenticated;

  const recipesState = useSelector((state) => state.recipes);
  const isFavFetched = recipesState.isFavFetched;
  const favKeys = recipesState.favKeys;
  const favUrls = recipesState.favUrl;
  const isFav = favUrls.includes(url);

  const [showIngredients, setShowIngredients] = useState(false);

  const dispatch = useDispatch();
  const addInFavHandler = () => {
    dispatch(storeFavRecipe({ recipeData: props.recipeDetails, UID }));
  };
  const unFavouriteHandler = () => {
    dispatch(unFavourite({ key: favKeys[url], url, UID }));
  };
  return (
    <Fragment>
      <Card className={classes.card}>
        <a href={url} target="_blank" rel="noreferrer">
          <Card.Img href={url} variant="top" src={img} />
        </a>
        <Card.Body>
          <a
            href={url}
            style={{ textDecoration: "none", color: "#0a0a0a" }}
            target="_blank"
            rel="noreferrer"
          >
            <Card.Title className="text-center">{title}</Card.Title>
          </a>
          <Button
            variant="outline-success"
            style={{ width: "100%" }}
            className="d-block mb-2"
            onClick={() => setShowIngredients(true)}
          >
            Ingrediants
          </Button>
          <Button
            variant="outline-danger"
            style={{ width: "100%" }}
            as="a"
            target="_blank"
            className="mb-2"
            href={url}
          >
            Full Recipe
          </Button>
          {isAuthenticated && !isFav && (
            <Button
              variant="outline-primary"
              style={{ width: "100%" }}
              onClick={addInFavHandler}
            >
              Add in Favourites
            </Button>
          )}
          {(isFav || isFavFetched) && (
            <Button
              variant="outline-primary"
              style={{ width: "100%" }}
              onClick={unFavouriteHandler}
            >
              Unfavourite
            </Button>
          )}
        </Card.Body>
      </Card>
      <RecipeIngredients
        show={showIngredients}
        details={props.recipeDetails.recipe}
        onHide={() => setShowIngredients(false)}
      />
    </Fragment>
  );
};
export default RecipeCard;
