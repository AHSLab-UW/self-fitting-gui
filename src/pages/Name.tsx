// create a page with a required form input for the user's name and submit button and save it to localStorage when the submit button is change and route to the next page
//
// Path: src/pages/Name.tsx
import { useState } from "react";

import "../styles/Name.css";
import { sendCommand } from "../Command";
import { useNavigate } from "react-router-dom";

export default function Name() {
  const [name, setName] = useState("");
  let navigate = useNavigate();

  return (
    <div style={{ marginTop: 200 }}>
      <h1 className="name-question"> What is your name? </h1>
      <input
        className="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      {name !== "" ? (
        <button
        className="big-button"
          onClick={() => {
            localStorage.setItem("name", name);
            if (name === "admin") {
              navigate("/admin")
            } else {
              navigate("/intro1")
              sendCommand("?read:/home/mha/self_fit.cfg");
              sendCommand("cmd=start");
            }
          }}
        >Next</button>
      ) : null}
    </div>
  );
}
