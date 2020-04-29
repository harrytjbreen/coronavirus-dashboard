import React, {useEffect, useState} from 'react';
import DataComponent from "./components/DataComponent";
import DropDownComponent from "./components/DropdownComponent";

const App = () => {

  const getData = () => {

    fetch("https://api.covid19api.com/summary")
      .then(res => res.json())
      .then(data => {
        setData(data)
      })
      .catch(() => setTimeout(getData,1000))

  };

  const [data, setData] = useState({Global: {}, Countries: []});
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getData();
    const update = setInterval(getData, 60000);
    return (() => clearInterval(update))
  },[]);


  return (
    <>
      <h1 className={'header'}>COVID-19</h1>
      <div style={{margin: 10}}>
        <DataComponent global data={data.Global} title={"World Figures"} date={data.Date}/>
        <DropDownComponent data={data.Countries} selected={selected} set={data => setSelected(data)}/>
        {selected && <DataComponent data={selected} title={selected.Country} date={selected.Date}/>}
      </div>
    </>
  );
};



export default App;
