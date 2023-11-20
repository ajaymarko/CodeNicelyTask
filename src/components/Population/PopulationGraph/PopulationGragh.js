import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import "./PopulationGragh.css";

const PopulationGragh = ({ populationCounts }) => {
  const finalGraphData = (populationCounts || []).map((populationItem) => {
    const { value, year } = populationItem || {};
    return { year, value };
  });

  return (
    <div className="graph_container">
      <ResponsiveBar
        data={finalGraphData}
        keys={["value"]}
        indexBy="year"
        margin={{
          top: 20,
          right: 0,
          bottom: 50,
          left: 100,
        }}
        padding={0.6}
        groupMode="grouped"
        colors="#2a7ef0"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 10,
          tickRotation: -45,
          legend: "Year",
          legendPosition: "middle",
          legendOffset: 40,
          truncateTickAt: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Population",
          legendPosition: "middle",
          legendOffset: -80,
          truncateTickAt: 0,
        }}
        enableGridX={false}
        enableGridY
        enableLabel={false}
      />
    </div>
  );
};

export default PopulationGragh;
