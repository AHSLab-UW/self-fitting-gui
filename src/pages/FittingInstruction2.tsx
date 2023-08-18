import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";
import buttonss from "../assets/imgs/buttonss.jpg";
export default function FittingInstruction() {
  return (
    <div>

      <h1 className="title">
        &#8594; Explore different sound adjustments by tapping each button on the screen.
        
      </h1>

      <img
        src={buttonss}
        alt={"buttonss"}
        style={{ maxWidth: 270, marginBottom: -20, borderBlockColor: "white" , border: "5px solid white"}}
      />

      <h1 className="title">
        &#8594; When you hear the talker most clearly and are least disturbed by the background noise, leave that button selected. Click 'NEXT', and repeat this task on the following pages. 
      </h1>

      <NextButton to="/buttons" text="Begin" style={{ marginTop: 15 }} />
    </div>
  );
}
