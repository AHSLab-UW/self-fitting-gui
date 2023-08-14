import { NextButton } from "../components/NextButton";
import "../styles/FittingInstruction.css";

export default function FittingInstruction() {
  return (
    <div>

      <h1 className="title">
      &#8594; Explore options on the screen by tapping on the buttons.
        
      </h1>

      <h1 className="title">
    
      &#8594; Choose the button to hear the speaker better and reduce background noise. Then, click "Next" and do it again until you finish.
      </h1>

      <NextButton to="/buttons" text="Continue" style={{ marginTop: 100 }} />
    </div>
  );
}
