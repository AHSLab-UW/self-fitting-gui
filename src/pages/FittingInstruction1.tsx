import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";

export default function FittingInstruction1() {
  return (
    <div>

      <br></br>
      <br></br>
      <h1 className="title">
    
      &#8594; When you hear the speaker most clearly and are least disturbed by the background noise, leave the cursor on that square. Click "NEXT", and repeat this task on the following pages.
      </h1>
      <br></br>
      <br></br>
      <h1 className="title">&#8594; Tip: Drag the cursor around the edges to familiarize yourself with how sound changes as you move around the grid. </h1>
                                    
      <NextButton to="/grid" text="Begin" style={{ marginTop: 30 }} />
    </div>
  );
}
