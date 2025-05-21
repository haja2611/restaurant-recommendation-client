import { Row, Col, Form } from "react-bootstrap";

const FilterRadioGroup = ({ options, selected, setSelected, name }) => (
  <Row>
    {options.map((option, index) => (
      <Col key={index} xs={6} md={3}>
        <Form.Check
          type="radio"
          name={name}
          label={option}
          checked={selected === option}
          onChange={() => setSelected(option)}
        />
      </Col>
    ))}
  </Row>
);

export default FilterRadioGroup;
