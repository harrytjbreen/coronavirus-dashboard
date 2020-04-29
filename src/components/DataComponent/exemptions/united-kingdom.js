import Axios from "axios";

const getDataUK = async () => {
  let values = {};
  await new Promise(((resolve) => {
    Axios.get('https://c19downloads.azureedge.net/downloads/json/coronavirus-cases_latest.json')
      .then(data =>{
        values = {
          TotalConfirmed: data.data.dailyRecords.totalLabConfirmedCases,
          NewConfirmed: data.data.dailyRecords.dailyLabConfirmedCases,
          TotalRecovered: -1,
          date: new Date(Date.parse(data.data.metadata.lastUpdatedAt)).toLocaleString()
        };
        resolve(true)
      })
      .catch(err => console.log(err));
  }));
  await new Promise((resolve => {
    Axios.get('https://c19downloads.azureedge.net/downloads/json/coronavirus-deaths_latest.json')
      .then(data =>{
        values = {...values,
          NewDeaths: data.data.overview[0].dailyHospitalDeaths,
          TotalDeaths: data.data.overview[0].totalHospitalDeaths,
          oldDeaths: data.data.overview
        };
        resolve(true)
      })
      .catch(err => console.log(err));
  }));
  return values
};

export default getDataUK;