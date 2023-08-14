import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";

export default function FittingInstruction() {
  return (
    <div>
      <h1 className="title">
      &#8594; To explore different options on the screen, simpy drag the cursor over the squares or tap on them.
        
      </h1>
      <h1 className="title">
    
      &#8594; Leave the cursor on the location, which allows you to listen to the speaker
        clearly without getting disturbed by the background noise. 
        Then, click "Next" and do it again until you finish.
      </h1>


      <h1 className="title">&#8594; Hint: Start from the edges of the grid to get the feeling</h1>

      <NextButton to="/grid" text="Continue" style={{ marginTop: 50 }} />
    </div>
  );
}
