import React, {useEffect, useState} from 'react';
import DataComponent from "./components/DataComponent";
import DropDownComponent from "./components/DropdownComponent";

const App = () => {

  const getData = async (url) => {

    return await fetch(url)
      .then(res => res.json())
  };

  const [overviewData, setOverviewData] = useState({});
  const [selected, setSelected] = useState(null);
  const [countries, setCountries] = useState(null);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    getData(`https://corona.lmao.ninja/v2/all`)
      .then(data => setOverviewData(data));
    getData(`https://api.covid19api.com/countries`)
      .then(data => setCountries(data.sort((a,b) => (a.Country > b.Country) ? 1: ((b.Country > a.Country) ? -1: 0))));
    const update = setInterval(getData(`https://corona.lmao.ninja/v2/all`), 1.08e+7);
    return (() => clearInterval(update))
  },[]);

  useEffect(() => {
    (async () => {
      if (selected) {
        await getData(`https://api.covid19api.com/total/country/${selected.Slug}`)
          .then(data => {
            const today = data[data.length-1];
            const yesterday = data[data.length-2];
            setSelectedData({
              cases: today.Confirmed,
              recovered: today.Recovered,
              deaths: today.Deaths,
              todayCases: today.Confirmed - yesterday.Confirmed,
              todayDeaths: today.Deaths - yesterday.Deaths,
              Date: today.Date,
              historicalData: data,
          })})
      }
    })();
  },[selected]);


  return (
    <>
      <h1 className={'header'}>COVID-19</h1>
      <div style={{margin: 10}}>
        <DataComponent global data={overviewData} title={"World Figures"}/>
        <DropDownComponent data={countries} set={data => setSelected(data)}/>
        <br/>
        {selected && <DataComponent data={selectedData} title={selected.Country}/>}
      </div>
    </>
  );
};



export default App;
