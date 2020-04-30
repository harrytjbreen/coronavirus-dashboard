import React from "react";
import {Alert, Col} from "react-bootstrap";

const Counter = ({name, variant, number,cases, percent}) =>(
    <Col>
      <Alert variant={variant}>
        <Alert.Heading>{name}</Alert.Heading>
        <hr/>
        <h2>{replace(number)}</h2>
        <h5>{ percent && (((number/cases).toString() !== "NaN") ? Math.round(number/(cases+number)*10000)/100 + '%': "-")  }</h5>
        {name !=="Total Deaths" && <br/>}
      </Alert>
    </Col>
);

const replace = x =>{
  if(x === -1) return "-";
  return x ? x : '-';
};

export default Counter;