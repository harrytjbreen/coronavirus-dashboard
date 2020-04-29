import React, {useEffect, useState} from "react";
import {Row} from "react-bootstrap";
import Counter from "./counter";
import index from "./exemptions";
import Graph from "./Graph";

const DataComponent = ({data, date, title,global}) =>{

  const [exceptionData,setData] = useState({});
  const [graph, setGraph] = useState(false);

  useEffect(() =>{
    setGraph(false);
    index().forEach(country => {
      if (country.name === data.Country){
        country.getData()
          .then(data => setData(data));
        setGraph(country.graph);
      }
    })
  });

  return(
    <>
      <h1>{title}</h1>
      <Row>
        <Counter name={`Confirmed Cases`} variant={'primary'} number={exceptionData.TotalConfirmed || data.TotalConfirmed}/>
        <Counter name={'New Cases'} variant={'secondary'} number={exceptionData.NewConfirmed || data.NewConfirmed}/>
        <Counter name={'Recovered Cases'} variant={'success'} number={exceptionData.TotalRecovered|| data.TotalRecovered}/>
        <Counter name={`New Deaths`} variant={'danger'} number={exceptionData.NewDeaths || data.NewDeaths}/>
        <Counter percent name={'Total Deaths'} variant={'info'} cases={exceptionData.TotalRecovered|| data.TotalRecovered} number={exceptionData.TotalDeaths|| data.TotalDeaths}/>
      </Row>
      {graph && exceptionData.oldDeaths !== undefined && <Graph deaths={exceptionData.oldDeaths}/>}
      <p style={{textAlign: "center"}}>Last Updated {(new Date(Date.parse(date)).toLocaleTimeString() !== "Invalid Date") ? exceptionData.date || new Date(Date.parse(date)).toLocaleTimeString() : '-'}</p>
    </>
  );
};

export default DataComponent;