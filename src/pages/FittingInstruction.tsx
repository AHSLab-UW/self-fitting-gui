import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";
import gridss from "../assets/imgs/gridgif.gif";

export default function FittingInstruction() {
  return (
    <div>


      <img
        src={gridss}
        alt={"gridss"}
        style={{ maxWidth: 400, marginTop: 20, borderBlockColor: "white" , border: "5px solid white"}}
      />
      
      <h1 className="title">
      &#8594; Explore different sound adjustments by dragging the cursor around the grid or tapping on individual squares.
        
      </h1>

                        
      <NextButton to="/fit-instruct1" text="Continue" style={{ marginTop: 30 }} />
    </div>
  );
}
