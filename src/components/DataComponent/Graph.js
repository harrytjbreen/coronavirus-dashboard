import React, {useEffect, useState} from "react";
import {Bar, Line} from "react-chartjs-2";
import {Button} from "react-bootstrap";

const Graph = ({data}) =>{

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth * 0.8,
      height: window.innerHeight * 0.3
    });
  };

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth * 0.8,
    height: window.innerHeight * 0.3
  });
  const [graphNum, setNum] = useState(0);
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return window.removeEventListener('resize', handleResize)
  });

  if(data !== `code=404, message=Not Found, internal=<nil>`) {

    const maxgraph = 1;
    const filteredData = data.filter(item => {
      console.log(item.Province);
      if (item.Province === "") return item
    });
    const labels = filteredData.map(item => new Date(Date.parse(item.Date)).toLocaleDateString());

    const dataGraphOne = {
      labels: labels,
      datasets: [
        {
          label: "Total Deaths",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(248,54,42,0.4)',
          pointBorderColor: 'rgb(248,54,42)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(248,54,42)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          data: filteredData.map(item => item.Deaths)
        },
        {
          label: "Total Cases",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(78,162,253,0.4)',
          pointBorderColor: 'rgb(78,162,253)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(204,229,253)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          data: filteredData.map(item => item.Confirmed)
        },
        {
          label: "Total Recovered",
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(121,237,77,0.4)',
          pointBorderColor: 'rgb(121,237,77)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(212,237,219)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          data: filteredData.map(item => item.Recovered)
        }
      ]

    };
    let previousDeaths = 0;
    let previousConfirmed = 0;
    const dataGraphTwo = {
      labels: labels,
      datasets: [
        {
          label: "Daily Deaths",
          backgroundColor: 'rgb(248,54,42)',
          data: filteredData.map(item => {
            let data = item.Deaths - previousDeaths;
            previousDeaths = item.Deaths;
            return data;
          })
        },
        {
          label: "Daily Cases",
          backgroundColor: 'rgb(78,162,253)',
          data: filteredData.map(item => {
            let data = item.Confirmed - previousConfirmed;
            previousConfirmed = item.Confirmed;
            return data;
          })
        }
      ]
    };

    const handleButtonClick = e => {
      if (graphNum + e > maxgraph) setNum(0);
      else if (graphNum + e < 0) setNum(maxgraph);
      else setNum(graphNum + e);
    };

    return (
      <>
        <div className={"rowC"}>
          <Button onClick={() => handleButtonClick(-1)} variant={"outline-success"}>←</Button>
          <Button onClick={() => handleButtonClick(1)} style={{marginLeft: "auto"}}
                  variant={"outline-success"}>→</Button>
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
  } else {
    return (
      <div>
        Can not find Historical Data
      </div>
    )
  }
};

export default Graph;