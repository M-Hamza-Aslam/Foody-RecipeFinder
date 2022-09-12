import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import IngredientTable from "./IngredientTable";
const RecipeIngredients = (props) => {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.details.label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <IngredientTable details={props.details} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          as="a"
          variant="outline-primary"
          target="_blank"
          href={props.details.url}
        >
          See More
        </Button>
        <Button variant="outline-danger" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RecipeIngredients;
