import React from "react";
import {Dropdown} from "semantic-ui-react";

const DropDownComponent = ({data, set}) => {
  if (data !== undefined) {
    const countries = data.map(country => ({
        "key": country.Country,
        "text": country.Country,
        "value": country.Country,
      }
    ));

    return(
        <Dropdown
          placeholder={"Select Country"}
          fluid
          selection
          search
          options={countries}
          onChange={(event,selected) => {
            data.map(country =>{
              if(selected.value === country.Country){
                set(country)
              }
            })
          }}
        />
    );
  }
  return (<></>);
};

export default DropDownComponent;