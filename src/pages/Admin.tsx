// create an admin page that takes a name input and fetch from /admin with the name as a query parameter and display the resulting json

import React, { useState } from "react";

type Props = {};

export default function Admin({}: Props) {
  const [data, setData] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  return (
    <div>
      <h1>Admin</h1>
      <p>Enter a name to see the data for that user</p>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          fetch(`/admin?name=${name}`)
            .then((res) => res.json())
            .then((data) => {
              setData([
                data.restaurant3x3,
                data.restaurant5x5,
                data.driving3x3,
                data.driving5x5,
              ]);
            });
        }}
      >
        Submit
      </button>

      <h2>Restaurant 3x3</h2>
      <p>{data[0]}</p>
      <h2>Restaurant 5x5</h2>
      <p>{data[1]}</p>
      <h2>Driving 3x3</h2>
      <p>{data[2]}</p>
      <h2>Driving 5x5</h2>
      <p>{data[3]}</p>
    </div>
  );
}
