import React, {useEffect, useState} from "react";
import {Bar, Line} from "react-chartjs-2";
import {Button, Col, Row} from "react-bootstrap";

const Graph = ({deaths, recovered, total, titles}) =>{

  const maxgraph = 1;
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth*0.8,
    height: window.innerHeight*0.3
  });
  const [graphNum,setNum] = useState(0);

  useEffect(() => {
    const handleResize = () =>{
      setDimensions({
        width: window.innerWidth*0.8,
        height: window.innerHeight*0.3
      });
      window.addEventListener('resize', handleResize);
      return _ => window.removeEventListener('resize',handleResize)
    }
  });

  const dataGraphOne = {
      labels: deaths.map(item => item.reportingDate).reverse(),
      datasets: [
        {
          label: titles.totalDeaths,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgb(248,54,42)',
          pointBorderColor: 'rgb(248,54,42)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(248,54,42)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          data: deaths.map(item => item.cumulativeDeaths).reverse()
        },
        {
          label: titles.totalCases,
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgb(204,229,253)',
          pointBorderColor: 'rgb(204,229,253)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(204,229,253)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          data: total.map(item => item.totalLabConfirmedCases).reverse()
        }
      ]

  };
  const dataGraphTwo = {
    labels: deaths.map(item => item.reportingDate).reverse(),
    datasets: [
      {
        label: titles.dailyDeaths,
        backgroundColor: 'rgb(248,54,42)',
        data: deaths.map(item => item.dailyChangeInDeaths).reverse()
      },
      {
        label: titles.dailyCases,
        backgroundColor: 'rgb(204,229,253)',
        data: total.map(item => item.dailyLabConfirmedCases).reverse()
      }
    ]
  };

  const handleButtonClick = e =>{
    if (graphNum+e > maxgraph) setNum(0);
    else if (graphNum+e < 0) setNum(maxgraph);
    else setNum(graphNum+e);
  };

  return(
    <>
      <div className={"rowC"}>
        <Button onClick={() => handleButtonClick(-1)} variant={"outline-success"}>←</Button>
        <Button onClick={() => handleButtonClick(1)} style={{ marginLeft: "auto"}} variant={"outline-success"}>→</Button>
      </div>
      {graphNum === 0 && <Line
        data={dataGraphOne}
        width={dimensions.width}
        height={dimensions.height}
      />}
      {graphNum === 1 && <Bar
        data={dataGraphTwo}
        width={dimensions.width}
        height={dimensions.height}
      />}
      <br/>
    </>
  )

};

export default Graph;