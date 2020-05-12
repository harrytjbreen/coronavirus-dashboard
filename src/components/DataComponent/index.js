import React from "react";
import {Row} from "react-bootstrap";
import Counter from "./Counter";
import Graph from "./Graph";

const DataComponent = ({data, title, global}) =>(
  <>
    <h1>{title}</h1>
    <Row>
      <Counter name={`Confirmed Cases`} variant={'primary'} number={data.cases}/>
      <Counter name={'New Cases'} variant={'secondary'} number={data.todayCases}/>
      <Counter name={'Recovered Cases'} variant={'success'} number={data.recovered}/>
      <Counter name={`New Deaths`} variant={'danger'} number={data.todayDeaths}/>
      <Counter percent name={'Total Deaths'} variant={'info'} cases={data.recovered} number={data.deaths}/>
    </Row>
    {!global && data.historicalData && <Graph data={data.historicalData}/>}
    {!global && <p style={{textAlign: "center"}}>Last Updated {new Date(Date.parse(data.Date)).toLocaleDateString()}</p>}
    {global && <p style={{textAlign: "center"}}>Last Updated {(new Date(data.updated).toLocaleTimeString() !== "Invalid Date") ? new Date(data.updated).toLocaleTimeString() : '-'}</p>}
  </>
);

export default DataComponent;