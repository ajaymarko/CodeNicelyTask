import React, { useEffect, useState } from "react";
import "./Population.css";
import PopulationGragh from "./PopulationGraph/PopulationGragh";

const Population = ({ countryName }) => {
  const [populationCountData, setPopulationCountsData] = useState();

  const getPopulationData = async () => {
    try {
      const response = await fetch(
        "https://countriesnow.space/api/v0.1/countries/population",
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

      const result = await response.json();

      const { data } = result || {};
      setPopulationCountsData(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getPopulationData();
  }, []);

  const { country, code, iso3, populationCounts } = populationCountData || {};

  return (
    <div className="population_container">
      <div className="country_info_container">
        <div className="country_info_item">{country}</div>
        <div className="country_info_item">{code}</div>
        <div className="country_info_item">{iso3}</div>
      </div>

      <div className="heading_container">Population Data</div>

      <PopulationGragh populationCounts={populationCounts} />
    </div>
  );
};

export default Population;
