import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import useInput from "../../Hooks/useInput";
import classes from "./LoginModal.module.css";
import { useDispatch } from "react-redux";
import { login, signUp } from "../../store/authenticateAction";
const LoginModal = (props) => {
  const dispatch = useDispatch();
  //using custom Hook for form validation
  const {
    value: emailInputValue,
    isValid: enteredEmailisValid,
    isError: emailInputIsInValid,
    inputKeyStrockHandler: emailKeyStrockHandler,
    InputBlurHandler: emailInputBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: passwordInputValue,
    isValid: enteredPasswordisValid,
    isError: passwordInputIsInValid,
    inputKeyStrockHandler: passwordKeyStrockHandler,
    InputBlurHandler: passwordInputBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => !(value.trim().length < 6));

  let formIsValid = false;
  if (enteredEmailisValid && enteredPasswordisValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    resetEmailInput();
    resetPasswordInput();
  };

  const emailInputClasses = emailInputIsInValid
    ? `mb-3  ${classes.invalid}`
    : "mb-3";
  const passwordInputClasses = passwordInputIsInValid
    ? `mb-3  ${classes.invalid}`
    : "mb-3";
  // functions
  const signupHandler = () => {
    const email = emailInputValue;
    const password = passwordInputValue;
    dispatch(signUp({ email, password, hideModal: props.onHide }));
  };
  const loginHandler = () => {
    const email = emailInputValue;
    const password = passwordInputValue;
    dispatch(login({ email, password, hideModal: props.onHide }));
  };
  const onClose = () => {
    resetEmailInput();
    resetPasswordInput();
    props.onHide();
  };

  return (
    <Modal show={props.show} onHide={props.onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Authentication</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formSubmitHandler}>
          <Form.Group
            className={emailInputClasses}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={emailKeyStrockHandler}
              onBlur={emailInputBlurHandler}
              value={emailInputValue}
            />
          </Form.Group>
          {emailInputIsInValid && (
            <p className={classes.errorText}>Email must include '@'</p>
          )}

          <Form.Group
            className={`mb-3 ${passwordInputClasses}`}
            controlId="formBasicPassword"
          >
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={passwordKeyStrockHandler}
              onBlur={passwordInputBlurHandler}
              value={passwordInputValue}
            />
          </Form.Group>
          {passwordInputIsInValid && (
            <p className={classes.errorText}>
              password must be atleast 6 characters long
            </p>
          )}
        </Form>
        <p>Don't have an account? put your credentials and click on Sign up!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={!formIsValid}
          variant="outline-primary"
          onClick={loginHandler}
        >
          Login
        </Button>
        <Button
          disabled={!formIsValid}
          variant="outline-primary"
          onClick={signupHandler}
        >
          Sign up
        </Button>
        <Button variant="outline-danger" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default LoginModal;
