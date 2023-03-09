// create a page with a required form input for the user's name and submit button and save it to localStorage when the submit button is change and route to the next page
//
// Path: src/pages/Name.tsx
import { useState } from "react";

import "../styles/Name.css";
import { NextButton } from "../components/NextButton";
import { sendCommand } from "../Command";

export default function Name() {
  const [name, setName] = useState("");

  return (
    <div style={{ marginTop: 50 }}>
      <h1>What is your name?</h1>
      <input
        className="name-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      {name !== "" ? (
        <NextButton
          to="/intro1"
          text="Submit"
          onclick={() => {
            localStorage.setItem("name", name);
            sendCommand("?read:/home/mha/self_fit.cfg");
            sendCommand("cmd=start");
          }}
        />
      ) : null}
    </div>
  );
}
