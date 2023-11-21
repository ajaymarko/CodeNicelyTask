import React, { useEffect, useState } from "react";
import Population from "../Population/Population";
import "./State.css";

const State = ({ country }) => {
  const { name: countryName } = country || {};
  const [initialStateList, setInitialStateList] = useState([]);
  const [stateSearch, setStateSearch] = useState("");

  const [stateList, setStateList] = useState([]);

  const fetchStateData = async () => {
    try {
      const data = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: countryName,
          }),
        }
      );

      const result = await data.json();

      const stateList = result?.data?.states;

      setStateList(stateList);
      setInitialStateList(stateList);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e) => {
    setTimeout(() => {
      setStateSearch(e.target.value);
    }, 500);
  };

  useEffect(() => {
    fetchStateData();
  }, []);

  useEffect(() => {
    const filteredList = initialStateList.filter((countryItem) => {
      const { name } = countryItem || {};
      const searchOnData = name.toLowerCase();
      const searchCountryName = stateSearch.toLowerCase();

      return searchOnData.includes(searchCountryName);
    });

    setStateList(filteredList);
  }, [stateSearch]);

  return (
    <>
      <Population countryName={countryName} />

      <div className="container">
        <div>State List</div>

        <div className="input_main_container">
          <input
            className="input_container"
            name="searchStateName"
            placeholder="Search by state name"
            onChange={handleChange}
          />
        </div>

        <div className="state_main_container">
          <div className="state_data_container">
            <div className="statename_container">State Name</div>

            <div className="state_code_container">ISO 3 CODE</div>
          </div>

          {(stateList || []).map((country) => {
            const { name, state_code } = country || {};

            return (
              <div className="state_data_container" key={state_code}>
                <div className="statename_container">{name}</div>

                <div className="state_code_container">{state_code}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default State;
