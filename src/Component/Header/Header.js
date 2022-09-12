import LoginModal from "../Login/LoginModal";
import classes from "./Header.module.css";
import useInput from "../../Hooks/useInput";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchRecipes } from "../../store/recipesAction";
import { authActions } from "../../store/authSlice";
import { recipesActions } from "../../store/recipesSlice";
import { UIActions } from "../../store/UISlice";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth.authenticated;
  const UID = auth.authResponseData.localId;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const dispatch = useDispatch();

  const searchButtonHandler = (event) => {
    event.preventDefault();
    if (!enteredsearchisValid) {
      return;
    }
    resetsearchInput();
    const searchKeyword = searchInputValue;
    dispatch(fetchRecipes({ method: "apiFetch", searchKeyword, UID }));
  };

  const favButtonHandler = async () => {
    dispatch(fetchRecipes({ method: "favFetch", UID }));
  };
  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(recipesActions.clearOnLogout());
    dispatch(
      UIActions.showNotification({
        status: "success",
        title: "logout",
        message: "user has been logout Successfully!",
      })
    );
    setTimeout(() => {
      dispatch(UIActions.hideNotification());
    }, 2000);
  };
  // search form validation
  const {
    value: searchInputValue,
    isValid: enteredsearchisValid,
    isError: searchInputIsInValid,
    inputKeyStrockHandler: searchKeyStrockHandler,
    InputBlurHandler: searchInputBlurHandler,
    reset: resetsearchInput,
  } = useInput((value) => value.trim() !== "");

  const searchInputClasses = searchInputIsInValid
    ? `ms-auto me-2 d-flex ${classes.invalid}`
    : "ms-auto me-2 d-flex";
  return (
    <Navbar style={{ background: "#6ACC00" }}>
      <Container fluid className={classes.container}>
        <Navbar.Brand
          href=" "
          className={`text-white fw-bold ${classes.brandName}   `}
        >
          Foody - Recipe Finder
        </Navbar.Brand>
        <Form className={searchInputClasses}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            style={{ width: "30vw" }}
            aria-label="Search"
            onChange={searchKeyStrockHandler}
            onBlur={searchInputBlurHandler}
            value={searchInputValue}
          />
          <Button
            variant="outline-success"
            className="text-white"
            onClick={searchButtonHandler}
            type="submit"
            disabled={!enteredsearchisValid}
          >
            Search
          </Button>
        </Form>
        <Nav className={`${classes.navbarClass}`}>
          {!isAuthenticated && (
            <Button
              variant="outline-success"
              className="text-white"
              onClick={() => {
                setShowLoginModal(true);
              }}
            >
              Login
            </Button>
          )}
          {isAuthenticated && (
            <Button
              variant="outline-success"
              className="text-white"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          )}
          <LoginModal
            show={showLoginModal}
            onHide={() => {
              setShowLoginModal(false);
            }}
          ></LoginModal>
          {isAuthenticated && (
            <Button
              variant="outline-success"
              className="mx-2 text-white"
              onClick={favButtonHandler}
            >
              Favourites
            </Button>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};
export default Header;
