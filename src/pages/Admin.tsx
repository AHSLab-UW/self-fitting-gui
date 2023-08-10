// create an admin page that takes a name input and fetch from /admin with the name as a query parameter and display the resulting json

import React, { useState } from "react";

type Props = {};

const bands = [250, 500, 1000, 2000, 4000, 8000];

export default function Admin({}: Props) {
  const [data, setData] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  function createCSVFile(csvData: string) {
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    return url;
  }

  function handleExportClick(csvData: string) {
    const csvUrl = createCSVFile(csvData);
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = name + "_self-fit.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div>
      <h1>Admin</h1>
      <p>Enter a name to see the data for that user</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div className="top-space"></div>
      <button
        className="big-button"
        onClick={() => {
          fetch(`/admin?name=${name}`)
            .then((res) => res.json())
            .then((data) => {
              setData([
                data.indoorButton,
                data.indoorGrid,
                data.outdoorButton,
                data.outdoorGrid,
              ]);
            });
        }}
      >
        Submit
      </button>

      <h2>Indoor Button</h2>
      <p>{data[0]}</p>
      <h2>Indoor Grid</h2>
      <p>{data[1]}</p>
      <h2>Outdoor Button</h2>
      <p>{data[2]}</p>
      <h2>Outdoor Grid</h2>
      <p>{data[3]}</p>

      <button
        className="big-button"
        onClick={() => {
          let csv =
            "Bands,SF_Indoor_Button,SF_Indoor_Grid,SF_Outdoor_Button,SF_Outdoor_Grid\n";
          for (let i = 0; i < bands.length; i++) {
            csv += bands[i] + ",";
            for (let j = 0; j < 4; j++) {
              if (data[j] && data[j].length > 0 && data[j] !== "[]") {
                const arr = JSON.parse(data[j]) as number[];
                if (arr && arr[i]) csv += Math.round(arr[i]);
              }
              csv += ",";
            }
            csv = csv.substring(0, csv.length - 1);
            csv += "\n";
          }

          handleExportClick(csv);
        }}
      >
        Export
      </button>
    </div>
  );
}
