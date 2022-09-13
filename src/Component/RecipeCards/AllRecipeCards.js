import RecipeCard from "./RecipeCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector } from "react-redux";
import { Fragment } from "react";

const AllRecipeCards = () => {
  const recipesState = useSelector((state) => state.recipes);
  const recipes = recipesState.foodRecipes;
  const isFavFetched = recipesState.isFavFetched;

  if (recipes.length === 0) {
    let text;
    if (isFavFetched) {
      text = "No favourites Found!";
    } else {
      text = "Search your favourite recipes!";
    }
    return (
      <Fragment>
        <h1 className="text-center mt-5">{text}</h1>
        <div className="d-flex justify-content-center">
          <a href="https://www.animatedimages.org/cat-foods-and-drinks-298.htm">
            <img
              src="https://www.animatedimages.org/data/media/298/animated-eat-and-drink-image-0151.gif"
              border="0"
              alt="animated-eat-and-drink-0151"
            />
          </a>
        </div>
      </Fragment>
    );
  }
  return (
    <Container className="my-5">
      <Row className="justify-content-center justify-content-lg-start">
        {recipes.map((recipe) => (
          <Col sm="auto" xl="4" xxl="3" className="mb-5" key={Math.random()}>
            <RecipeCard recipeDetails={recipe} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default AllRecipeCards;
