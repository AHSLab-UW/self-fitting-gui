import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";

export default function FittingInstruction() {
  return (
    <div>
      <h1 className="title">
      &#8594; Explore various options on the screen by dragging the cursor on the squares.
        
      </h1>
      <h1 className="title">
    
      &#8594; Leave the cursor on the location, which allows you to listen to the speaker
        clearly without getting disturbed by the background noise. 
                     Then, click "Next".
      </h1>


      <h1 className="title">&#8594; Start from the edges of the grid to get the feeling</h1>

      <NextButton to="/grid" text="Continue" style={{ marginTop: 80 }} />
    </div>
  );
}
