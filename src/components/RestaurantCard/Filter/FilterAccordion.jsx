import { Accordion } from "react-bootstrap";
import FilterCheckboxGroup from "./FilterCheckboxGroup";
import FilterRadioGroup from "./FilterRadioGroup";

const FilterAccordion = ({ tempValues, setters, filters }) => (
  <Accordion defaultActiveKey={["0"]} alwaysOpen>
    {filters.map((filter, index) => (
      <Accordion.Item eventKey={index.toString()} key={index}>
        <Accordion.Header>{filter.title}</Accordion.Header>
        <Accordion.Body>
          {filter.type === "checkbox" ? (
            <FilterCheckboxGroup
              options={filter.options}
              selected={tempValues[filter.key]}
              setSelected={setters[filter.key]}
              label={filter.title}
            />
          ) : (
            <FilterRadioGroup
              options={filter.options}
              selected={tempValues[filter.key]}
              setSelected={setters[filter.key]}
              name={filter.key}
            />
          )}
        </Accordion.Body>
      </Accordion.Item>
    ))}
  </Accordion>
);

export default FilterAccordion;
