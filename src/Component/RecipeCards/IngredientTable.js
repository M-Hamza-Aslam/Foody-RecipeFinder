import Table from "react-bootstrap/Table";
const IngredientTable = (props) => {
  return (
    <Table striped size="sm">
      <thead>
        <tr>
          <th>Ingredient</th>
          <th className="text-center ">Weight</th>
        </tr>
      </thead>
      <tbody>
        {props.details.ingredients.map((ingredientDetails) => {
          return (
            <tr key={Math.random()}>
              <td>{ingredientDetails.text}</td>
              <td className="m-2">{ingredientDetails.weight}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
export default IngredientTable;
