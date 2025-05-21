import { Row, Col, Form } from "react-bootstrap";

const FilterCheckboxGroup = ({ options, selected, setSelected }) => {
  const handleChange = (value) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
  };

  return (
    <Row>
      {options.map((option, index) => (
        <Col key={index} xs={6} md={4}>
          <Form.Check
            type="checkbox"
            label={option}
            checked={selected.includes(option)}
            onChange={() => handleChange(option)}
          />
        </Col>
      ))}
    </Row>
  );
};

export default FilterCheckboxGroup;
