import { NextButton } from "./NextButton";
import "../styles/StartMenu.css";
import "../styles/NextButton.css";
import { useState } from "react";

type HalfwayProps = {
  fadeIn: boolean;
  handleContinue: () => void; 
};


const Halfway_grid = ({ fadeIn, handleContinue }: HalfwayProps) => {
  return (
    <div className={`halfway_message_grid`}>
      <h3>You're halfway there - you're doing great!</h3>
      <h3>Keep going for a few more rounds!</h3> 
      <h3> Remember that you can use the volume control to adjust the overall sound level.</h3>

      <button className="big-button" onClick={handleContinue}>Continue self-Fitting</button>
    </div>
  );
};

export default Halfway_grid;