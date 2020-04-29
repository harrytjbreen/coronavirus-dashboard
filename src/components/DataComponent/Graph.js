import React, {useEffect, useState} from "react";
import {Bar, Line} from "react-chartjs-2";
import {Button} from "react-bootstrap";

const Graph = ({deaths}) =>{

  const maxgraph = 1;
  const [width, setWidth] = useState(window.innerWidth*0.8);
  const [graphNum,setNum] = useState(0);

  useEffect(() => {
    const handleResize = () =>{
      setWidth(window.innerWidth*0.8);
      window.addEventListener('resize', handleResize);
      return _ => window.removeEventListener('resize',handleResize)
    }
  });

  const dataGraphOne = {
      labels: deaths.map(item => item.reportingDate).reverse(),
      datasets: [
        {
          label: 'Total Deaths',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(248,54,42,0.4)',
          borderColor: 'rgb(248,54,42)',
          pointBorderColor: 'rgb(248,54,42)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(248,54,42)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          data: deaths.map(item => item.totalHospitalDeaths).reverse()
        }
      ]
  };
  const dataGraphTwo = {
    labels: deaths.map(item => item.reportingDate).reverse(),
    datasets: [
      {
        label: "Deaths Per Day",
        backgroundColor: 'rgba(248,54,42,0.4)',
        borderColor: 'rgb(248,54,42)',
        pointBorderColor: 'rgb(248,54,42)',
        data: deaths.map(item => item.dailyHospitalDeaths).reverse()
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
      <Button onClick={() => handleButtonClick(-1)} variant={"outline-success"}>←</Button>
      <Button onClick={() => handleButtonClick(1)} style={{ marginLeft: "auto", display: 'flex', justifyContent: 'flex-end' }} variant={"outline-success"}>→</Button>
      {graphNum === 0 && <Line
        data={dataGraphOne}
        width={width}
        height={width*0.2}
      />}
      {graphNum === 1 && <Bar
        data={dataGraphTwo}
        width={width}
        height={width*0.2}
        />}
    </>
  )

};

export default Graph;