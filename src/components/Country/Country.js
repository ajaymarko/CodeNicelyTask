import React, { useEffect, useState } from "react";
import State from "../State/State";
import "./Country.css";

const Country = () => {
  const [initialCountryList, setInitialCountryList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [showStateData, setShowStateData] = useState({
    show: false,
    country: {},
  });

  const fetchCountryData = async () => {
    try {
      const data = await fetch(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      const result = await data.json();

      const finalResult = result.data;

      setCountryList(finalResult);
      setInitialCountryList(finalResult);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange = (e) => {
    setTimeout(() => {
      setSearchCountry(e.target.value);
    }, 500);
  };

  useEffect(() => {
    fetchCountryData();
  }, []);

  useEffect(() => {
    const filteredList = initialCountryList.filter((countryItem) => {
      const { name } = countryItem || {};
      const searchOnData = name.toLowerCase();
      const searchCountryName = searchCountry.toLowerCase();

      return searchOnData.includes(searchCountryName);
    });

    setCountryList(filteredList);
  }, [searchCountry]);

  if (showStateData.show) {
    return <State country={showStateData.country} />;
  }

  return (
    <div className="container">
      <div>Countries List</div>

      <div className="input_main_container">
        <input
          className="input_container"
          name="searchCountryName"
          placeholder="Search by country name"
          onChange={handleChange}
        />
      </div>

      <div className="countries_main_container">
        <div className="country_data_container">
          <div className="countryname_container">Country Name</div>
          <div className="iso2_container">ISO 2 CODE</div>
          <div className="longitude_container">LONGITUDE</div>
          <div className="latitude_container">LATITUDE</div>
        </div>

        {(countryList || []).map((country) => {
          const { name, iso2, long, lat } = country || {};

          return (
            <div
              className="country_data_container"
              key={iso2}
              onClick={() => {
                setShowStateData({
                  show: true,
                  country: country,
                });
              }}
            >
              <div className="countryname_container">{name}</div>
              <div className="iso2_container">{iso2}</div>
              <div className="longitude_container">{long}</div>
              <div className="latitude_container">{lat}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Country;
